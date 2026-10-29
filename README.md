# Hệ thống quản lý món ăn trên nền tảng đám mây

- **Họ và tên:** Lê Chấn Huy
- **MSSV:** 236017
- **Frontend:** React, Vite, Nginx
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas

## Chạy backend bằng Docker

Từ thư mục `backend`, tạo file `.env` với chuỗi kết nối MongoDB rồi chạy:

```powershell
docker pull huy4356/backend:latest
docker run -d --name backend-container -p 5000:5000 --env-file .env huy4356/backend:latest
```

Backend sẽ phục vụ tại `http://localhost:5000`.

## Đóng gói và chạy frontend bằng Docker

Frontend sử dụng `VITE_API_URL` tại thời điểm build. Khi chạy local cùng backend:

```powershell
cd frontend
docker build --build-arg VITE_API_URL=http://localhost:5000/api -t huy4356/frontend:latest .
docker run -d --name frontend-container -p 8080:80 huy4356/frontend:latest
```

Mở giao diện tại `http://localhost:8080`.

Khi triển khai backend ở địa chỉ khác, truyền URL backend lúc build, ví dụ:

```powershell
docker build --build-arg VITE_API_URL=https://your-backend.example.com/api -t huy4356/frontend:latest .
```

Dockerfile đã chuyển build argument này thành biến môi trường để Vite nhúng đúng URL vào bundle.

## Đẩy frontend image lên Docker Hub

```powershell
docker login
docker push huy4356/frontend:latest
```

Image frontend dùng để nộp bài:

```text
huy4356/frontend:latest
```
