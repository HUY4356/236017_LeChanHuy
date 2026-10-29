# Hệ thống quản lý món ăn trên nền tảng đám mây

- **Họ và tên:** Lê Chấn Huy
- **MSSV:** 236017
- **Frontend:** React, Vite, Nginx
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas

## Hướng dẫn chạy Backend bằng Docker
1. Kéo image từ Docker Hub:
   `docker pull huy4356/backend-food-app`
2. Tạo file `.env` chứa các biến môi trường cần thiết (ví dụ: `MONGO_URI`, `PORT=5000`).
3. Chạy container:
   `docker run -d -p 5000:5000 --env-file .env --name backend-container huy4356/backend-food-app`

## Hướng dẫn chạy Frontend bằng Docker
1. Kéo image từ Docker Hub:
   `docker pull huy4356/frontend-food-app`
2. Chạy container frontend ở cổng 8080:
   `docker run -d -p 8080:80 --name frontend-container huy4356/frontend-food-app`
3. Truy cập ứng dụng tại: `http://localhost:8080` (Lưu ý: Cần chạy kèm container Backend ở cổng 5000 để API hoạt động).

## Triển khai (Deployment)
- **Frontend URL (Render):** `https://two36017-lechanhuy.onrender.com/`
- **Backend API URL (Render):** `https://two36017-lechanhuy-1.onrender.com/api/foods`