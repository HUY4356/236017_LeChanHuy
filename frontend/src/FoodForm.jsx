import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function FoodForm() {
  const [formData, setFormData] = useState({
    foodId: '', name: '', category: '', cuisine: '', price: '', quantity: '', description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); // Nếu có id thì là chế độ Sửa, không có là Thêm

  useEffect(() => {
    if (id) {
      // Chế độ sửa: Load dữ liệu cũ
      const fetchFood = async () => {
        try {
          const res = await axios.get(`${API_URL}/foods/${id}`);
          setFormData(res.data.data);
        } catch (err) {
          setError('Không tải được dữ liệu món ăn');
        }
      };
      fetchFood();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        await axios.put(`${API_URL}/foods/${id}`, formData);
        alert('Cập nhật thành công!');
      } else {
        await axios.post(`${API_URL}/foods`, formData);
        alert('Thêm món ăn thành công!');
      }
      navigate('/'); // Quay về trang chủ
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi lưu dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Cập nhật món ăn' : 'Thêm món ăn mới'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <input type="text" name="foodId" placeholder="Mã món (VD: F004)" value={formData.foodId} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Tên món ăn" value={formData.name} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Loại món (Món nước, Cơm...)" value={formData.category} onChange={handleChange} />
        <input type="text" name="cuisine" placeholder="Vùng miền (Bắc, Trung, Nam...)" value={formData.cuisine} onChange={handleChange} />
        <input type="number" name="price" placeholder="Giá bán" value={formData.price} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Số lượng" value={formData.quantity} onChange={handleChange} />
        <textarea name="description" placeholder="Mô tả..." value={formData.description} onChange={handleChange}></textarea>
        
        <button type="submit" disabled={loading}>{loading ? 'Đang xử lý...' : 'Lưu dữ liệu'}</button>
      </form>
    </div>
  );
}