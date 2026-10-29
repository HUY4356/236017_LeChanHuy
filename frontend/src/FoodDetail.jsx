import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function FoodDetail() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods/${id}`);
        setFood(res.data.data);
      } catch (err) {
        setError('Không tìm thấy thông tin món ăn');
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading) return <p>Đang tải thông tin...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!food) return <p>Không có dữ liệu</p>;

  return (
    <div>
      <h2>Chi tiết món ăn: {food.name}</h2>
      <ul style={{ lineHeight: '1.8' }}>
        <li><strong>Mã món:</strong> {food.foodId}</li>
        <li><strong>Loại món:</strong> {food.category}</li>
        <li><strong>Ẩm thực:</strong> {food.cuisine}</li>
        <li><strong>Giá bán:</strong> {food.price} VNĐ</li>
        <li><strong>Số lượng tồn:</strong> {food.quantity}</li>
        <li><strong>Mô tả:</strong> {food.description}</li>
      </ul>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>← Quay lại danh sách</Link>
    </div>
  );
}