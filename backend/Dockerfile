# Sử dụng môi trường Node.js nhẹ
FROM node:22-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy các file cấu hình package vào trước để cài đặt
COPY package*.json ./

# Cài đặt các thư viện
RUN npm ci --omit=dev

# Copy toàn bộ mã nguồn còn lại (ngoại trừ những thứ trong .dockerignore)
COPY . .

# Mở cổng 5000
EXPOSE 5000

# Lệnh khởi chạy server
CMD ["node", "server.js"]