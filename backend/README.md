# Backend Tin Tức - Sails.js + MongoDB Atlas

Backend API cho website tin tức, được xây dựng với Sails.js framework và MongoDB Atlas.

## 🚀 Công nghệ sử dụng

- **Framework**: Sails.js (MVC)
- **Database**: MongoDB Atlas  
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcryptjs
- **ORM**: Waterline (built-in Sails)

## 📁 Cấu trúc project

```
backend-tintuc/
├── api/
│   ├── controllers/          # Controllers xử lý requests
│   ├── models/              # Models (database schema)
│   ├── policies/            # Middleware authentication
│   └── helpers/             # Helper functions
├── config/                  # Configuration files
│   ├── datastores.js        # MongoDB connection
│   ├── routes.js            # API routes
│   └── security.js          # CORS settings
└── .env                     # Environment variables
```

## 🔧 Cài đặt

### 1. Install dependencies

```bash
npm install
```

### 2. Chạy server

```bash
npm start
# hoặc
sails lift
```

Server chạy tại: **http://localhost:1337**

## 📚 API Endpoints

### Authentication APIs

- `POST /api/v1/auth/register` - Đăng ký
- `POST /api/v1/auth/login` - Đăng nhập
- `GET /api/v1/auth/me` - Lấy user hiện tại (requires token)

### Resource APIs (News, Services, Banks, Sliders, Menus)

- `GET /api/v1/{resource}` - Lấy danh sách
- `GET /api/v1/{resource}/:id` - Lấy theo ID
- `POST /api/v1/{resource}` - Tạo mới (Admin only)
- `PUT /api/v1/{resource}/:id` - Cập nhật (Admin only)
- `DELETE /api/v1/{resource}/:id` - Xóa (Admin only)

## 🔐 Authentication

Sử dụng JWT token trong header:

```http
Authorization: Bearer <token>
```

## 🧪 Test API

### Register:
```bash
POST http://localhost:1337/api/v1/auth/register
Content-Type: application/json

{
  "fullName": "Nguyen Van A",
  "email": "test@example.com",
  "password": "123456"
}
```

### Login:
```bash
POST http://localhost:1337/api/v1/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}
```

## 📝 Lệnh Sails CLI đã sử dụng

```bash
# Tạo models và controllers
sails generate api User
sails generate api News
sails generate api Service
sails generate api Bank
sails generate api Slider
sails generate api Menu
sails generate controller Auth
```

## 👨‍💻 Author

Backend Tin Tức - 2026

