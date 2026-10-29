import { Link, Route, Routes } from 'react-router-dom'
import FoodDetail from './FoodDetail.jsx'
import FoodForm from './FoodForm.jsx'
import FoodList from './FoodList.jsx'
import './App.css'

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: 'blue' }}>Trang chủ (Danh sách)</Link>
        <Link to="/add" style={{ textDecoration: 'none', color: 'green' }}>+ Thêm món ăn</Link>
      </nav>

      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/add" element={<FoodForm />} />
        <Route path="/edit/:id" element={<FoodForm />} />
        <Route path="/detail/:id" element={<FoodDetail />} />
      </Routes>
    </div>
  );
}

export default App
