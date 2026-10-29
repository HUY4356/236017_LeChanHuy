require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Model (Đã tạo ở Câu 2)
const Food = require('./models/Food');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Phân tích JSON body

// ==========================================
// 1. Kết nối MongoDB Atlas
// ==========================================
mongoose.connect(process.env.MONGO_URI, {
  dbName: '236017_LeChanHuy'
})
  .then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
  .catch((err) => {
    console.error('❌ Lỗi kết nối MongoDB:', err.message);
    process.exit(1); // Dừng server nếu lỗi kết nối database
  });

// ==========================================
// 2. Endpoint kiểm tra trạng thái hoạt động
// ==========================================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running smoothly' });
});

// ==========================================
// 3. Các API Quản lý món ăn
// ==========================================

// [GET] Lấy danh sách món ăn & Tìm kiếm theo từ khóa
app.get('/api/foods', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // Xử lý tìm kiếm (hỗ trợ tên, loại món ăn, vùng miền)
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },       // 'i' để không phân biệt hoa/thường
          { category: { $regex: search, $options: 'i' } },
          { cuisine: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const foods = await Food.find(query);
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// [GET] Xem thông tin một món ăn theo ID
app.get('/api/foods/:id', async (req, res) => {
  try {
    // Có thể tìm theo _id của MongoDB hoặc trường custom foodId
    const food = await Food.findOne({ 
      $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { foodId: req.params.id }] 
    });
    
    if (!food) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy món ăn' });
    }
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// [POST] Thêm món ăn mới
app.post('/api/foods', async (req, res) => {
  try {
    const { foodId, name, price } = req.body;

    // Kiểm tra dữ liệu đầu vào cơ bản
    if (!foodId || !name || price === undefined) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đủ foodId, name và price' });
    }

    // Không cho phép trùng mã món ăn (foodId)
    const existingFood = await Food.findOne({ foodId });
    if (existingFood) {
      return res.status(400).json({ success: false, message: 'Mã món ăn (foodId) đã tồn tại' });
    }

    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).json({ success: true, message: 'Thêm món ăn thành công', data: newFood });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// [PUT] Cập nhật thông tin món ăn
app.put('/api/foods/:id', async (req, res) => {
  try {
    const { foodId } = req.body;

    // Nếu có truyền foodId mới, kiểm tra xem nó có trùng với món khác không
    if (foodId) {
      const existingFood = await Food.findOne({ foodId, _id: { $ne: req.params.id } });
      if (existingFood) {
        return res.status(400).json({ success: false, message: 'Mã món ăn (foodId) cập nhật bị trùng lặp' });
      }
    }

    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, // Trả về document sau khi đã update
      runValidators: true // Chạy schema validation
    });

    if (!updatedFood) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy món ăn để cập nhật' });
    }
    res.status(200).json({ success: true, message: 'Cập nhật thành công', data: updatedFood });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ', error: error.message });
  }
});

// [DELETE] Xóa món ăn
app.delete('/api/foods/:id', async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy món ăn để xóa' });
    }
    res.status(200).json({ success: true, message: 'Xóa món ăn thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==========================================
// Khởi chạy Server
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend Server đang chạy tại http://localhost:${PORT}`);
});