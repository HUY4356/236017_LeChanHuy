import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFoods = async (searchTerm = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/foods?search=${searchTerm}`);
      setFoods(res.data.data);
      setError('');
    } catch (err) {
      setError('Lỗi khi tải danh sách món ăn');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFoods(search);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa món này?')) {
      try {
        await axios.delete(`${API_URL}/foods/${id}`);
        fetchFoods(search); // Cập nhật lại list
        alert('Xóa thành công!');
      } catch (err) {
        alert('Lỗi khi xóa món ăn');
      }
    }
  };

  return (
    <div>
      <h2>Danh sách món ăn</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Tìm kiếm món ăn, loại, vùng miền..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '5px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '5px 10px', marginLeft: '5px' }}>Tìm kiếm</button>
      </form>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th>Mã món</th>
              <th>Tên món ăn</th>
              <th>Loại</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {foods.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign:'center' }}>Không có dữ liệu</td></tr>
            ) : (
              foods.map(food => (
                <tr key={food._id}>
                  <td>{food.foodId}</td>
                  <td>{food.name}</td>
                  <td>{food.category}</td>
                  <td>{food.price} VNĐ</td>
                  <td>
                    <Link to={`/detail/${food._id}`}>Xem</Link> |{' '}
                    <Link to={`/edit/${food._id}`}>Sửa</Link> |{' '}
                    <button onClick={() => handleDelete(food._id)} style={{ color: 'red', cursor: 'pointer' }}>Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}