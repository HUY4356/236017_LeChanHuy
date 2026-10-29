# Hệ Thống Quản Lý Món Ăn Trên Nền Tảng Đám Mây

- **Họ và tên**: Lê Chấn Huy
- **MSSV**: 236017
- **Học phần**: Điện toán đám mây

## 1. Công nghệ sử dụng
- Frontend: React (Vite)
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Containerization: Docker, Docker Hub
- Cloud Deployment: Render

## Hướng dẫn chạy Backend bằng Docker
1. Kéo image từ Docker Hub:
   `docker pull huy4356/backend-food-app`
2. Tạo file `.env` chứa các biến môi trường cần thiết (ví dụ: `MONGO_URI`, `PORT=5000`).
3. Chạy container:
   `docker run -d -p 5000:5000 --env-file .env --name backend-container huy4356/backend-food-app`

