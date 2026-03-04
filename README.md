# 📰 Website Tin Tức 24h

Website tin tức hiện đại được xây dựng bằng **React + Vite**, có đầy đủ chức năng đăng ký/đăng nhập với API thật.

## ✨ TÍNH NĂNG

### 🎯 Chức năng chính
- ✅ **4 Trang:** Trang chủ, Dịch vụ, Ngân hàng, Tin tức
- ✅ **Routing:** Điều hướng với React Router
- ✅ **Slider tự động:** Trang chủ có slider chuyển ảnh
- ✅ **Lọc tin tức:** Lọc theo danh mục (Công nghệ, Tài chính, Du lịch, Thể thao)
- ✅ **Dữ liệu JSON:** Tất cả dữ liệu lấy từ file JSON (không fix cứng)

### 🔐 Authentication (Đăng ký/Đăng nhập)
- ✅ **Modal popup đẹp mắt**
- ✅ **Form validation** (Kiểm tra dữ liệu)
- ✅ **API thật** (MockAPI.io)
- ✅ **Thông báo thành công/lỗi** với animation
- ✅ **Lưu phiên đăng nhập** (localStorage)
- ✅ **Đăng xuất**

### 🎨 Giao diện
- ✅ **Responsive:** Hiển thị tốt trên mọi thiết bị
- ✅ **Animations mượt mà**
- ✅ **Header/Footer tái sử dụng** (Components)
- ✅ **Menu động** (lấy từ JSON)

---

## 📁 CẤU TRÚC PROJECT

```
web-tintuc/
├── public/
│   └── data/                    # Dữ liệu JSON
│       ├── menu.json           # Menu điều hướng
│       ├── slider.json         # Ảnh slider
│       ├── news.json           # Bài viết tin tức
│       ├── services.json       # Dịch vụ
│       └── banks.json          # Ngân hàng
│
├── src/
│   ├── components/             # Components tái sử dụng
│   │   ├── Header.jsx          # Header (có auth)
│   │   ├── Menu.jsx            # Menu điều hướng
│   │   ├── Footer.jsx          # Footer
│   │   ├── Modal.jsx           # Modal cơ bản
│   │   ├── LoginForm.jsx       # Form đăng nhập
│   │   ├── RegisterForm.jsx    # Form đăng ký
│   │   └── NotificationModal.jsx  # Modal thông báo
│   │
│   ├── pages/                  # Các trang
│   │   ├── HomePage.jsx        # Trang chủ
│   │   ├── ServicesPage.jsx    # Trang dịch vụ
│   │   ├── BanksPage.jsx       # Trang ngân hàng
│   │   └── NewsPage.jsx        # Trang tin tức
│   │
│   ├── services/               # Services xử lý logic
│   │   └── authService.js      # Xử lý đăng ký/đăng nhập
│   │
│   ├── App.jsx                 # Cấu hình routing
│   └── main.jsx                # Entry point
│
├── HUONG_DAN_MOCKAPI.md       # Hướng dẫn setup MockAPI
├── GIAI_THICH_AUTH.md         # Giải thích chi tiết hệ thống Auth
└── README.md                   # File này
```

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Setup MockAPI (Quan trọng!)

**Đọc file:** [HUONG_DAN_MOCKAPI.md](./HUONG_DAN_MOCKAPI.md)

**Tóm tắt:**
1. Truy cập: https://www.mockapi.io/
2. Đăng ký tài khoản miễn phí
3. Tạo project mới
4. Tạo endpoint `/users` với fields: id, fullName, email, password, createdAt
5. Copy API URL
6. Paste vào `src/services/authService.js` dòng 23

### Bước 3: Chạy website

```bash
npm run dev
```

Mở trình duyệt: **http://localhost:5174**

---

## 📖 TÀI LIỆU HƯỚNG DẪN

### 📘 Chi tiết hệ thống Auth
Đọc file: [GIAI_THICH_AUTH.md](./GIAI_THICH_AUTH.md)

Bao gồm:
- Giải thích từng component
- Flow hoàn chỉnh (đăng ký → đăng nhập)
- Cách hoạt động của API
- Cách tùy chỉnh

### 📗 Setup MockAPI
Đọc file: [HUONG_DAN_MOCKAPI.md](./HUONG_DAN_MOCKAPI.md)

Hướng dẫn chi tiết từng bước với hình ảnh.

---

## 🎯 CÁCH SỬ DỤNG

### 1. Đăng ký tài khoản mới
1. Click nút **"Đăng ký"** ở Header
2. Nhập thông tin:
   - Họ và tên
   - Email
   - Mật khẩu (tối thiểu 6 ký tự)
   - Xác nhận mật khẩu
3. Click **"Đăng ký"**
4. Nếu thành công → Modal đăng nhập tự động hiện

### 2. Đăng nhập
1. Click nút **"Đăng nhập"** ở Header
2. Nhập email và mật khẩu đã đăng ký
3. Click **"Đăng nhập"**
4. Nếu thành công → Header hiển thị tên của bạn

### 3. Xem tin tức
1. Click menu **"Tin Tức"**
2. Lọc theo danh mục: Tất cả, Công nghệ, Tài chính, Du lịch, Thể thao
3. Click **"Đọc thêm"** để xem chi tiết

### 4. Đăng xuất
1. Click nút **"Đăng xuất"** ở Header
2. Phiên đăng nhập sẽ bị xóa

---

## 🔧 TÙY CHỈNH DỮ LIỆU

Tất cả dữ liệu đều nằm trong `public/data/` dạng JSON.

### Thêm menu mới
Sửa file: [public/data/menu.json](./public/data/menu.json)

```json
{
  "id": 5,
  "title": "Liên hệ",
  "path": "/lien-he",
  "icon": "📞"
}
```

### Thêm bài viết tin tức
Sửa file: [public/data/news.json](./public/data/news.json)

```json
{
  "id": 5,
  "title": "Tiêu đề bài viết",
  "summary": "Tóm tắt ngắn gọn",
  "content": "Nội dung đầy đủ",
  "image": "https://link-anh.jpg",
  "author": "Tên tác giả",
  "date": "2026-02-25",
  "category": "Công nghệ"
}
```

### Thêm slider
Sửa file: [public/data/slider.json](./public/data/slider.json)

---

## 💡 KIẾN THỨC HỌC ĐƯỢC

### React Basics
- ✅ **Components:** Tạo component tái sử dụng
- ✅ **Props:** Truyền dữ liệu giữa components
- ✅ **State (useState):** Quản lý dữ liệu
- ✅ **Effects (useEffect):** Xử lý side effects
- ✅ **Conditional Rendering:** Hiển thị có điều kiện

### React Router
- ✅ **BrowserRouter:** Bật routing
- ✅ **Routes & Route:** Định nghĩa đường dẫn
- ✅ **NavLink:** Link điều hướng với active class

### API & Data
- ✅ **fetch():** Gọi API
- ✅ **async/await:** Xử lý bất đồng bộ
- ✅ **JSON:** Làm việc với dữ liệu JSON
- ✅ **localStorage:** Lưu trữ dữ liệu

### Form Handling
- ✅ **Form validation:** Kiểm tra dữ liệu
- ✅ **Error handling:** Xử lý lỗi
- ✅ **Loading states:** Trạng thái loading

### CSS
- ✅ **Flexbox & Grid:** Layout hiện đại
- ✅ **Animations:** Hiệu ứng chuyển động
- ✅ **Responsive:** Điều chỉnh theo màn hình

---

## 📦 CÔNG NGHỆ SỬ DỤNG

- **React 19.2.0** - Thư viện UI
- **React Router DOM 7.x** - Routing
- **Vite 8.0** - Build tool
- **MockAPI.io** - API giả lập
- **CSS3** - Styling với animations

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi: "Failed to fetch"
**Nguyên nhân:** API URL chưa đúng hoặc mất kết nối

**Giải pháp:**
1. Kiểm tra `src/services/authService.js` dòng 23
2. Đảm bảo URL từ MockAPI đã paste đúng
3. Test API bằng trình duyệt: `https://xxx.mockapi.io/api/v1/users`

### Lỗi: "Email đã được sử dụng"
**Nguyên nhân:** Email đã tồn tại trong database

**Giải pháp:**
- Dùng email khác
- Hoặc xóa user cũ trên MockAPI dashboard

### Lỗi: Modal không hiện
**Nguyên nhân:** z-index bị conflict

**Giải pháp:**
- Kiểm tra CSS có class khác có `z-index` cao hơn 1000 không

---

## 🎓 KIẾN TRÚC SO SÁNH

### React vs AngularJS

| AngularJS | React |
|-----------|-------|
| Directive | Component |
| Controller | useState + useEffect |
| $scope | useState |
| $http.get() | fetch() |
| ng-repeat | .map() |
| ui-sref | NavLink |
| $stateProvider | BrowserRouter + Routes |

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Đọc file [GIAI_THICH_AUTH.md](./GIAI_THICH_AUTH.md)
2. Đọc file [HUONG_DAN_MOCKAPI.md](./HUONG_DAN_MOCKAPI.md)
3. Kiểm tra console trong trình duyệt (F12)
4. Kiểm tra terminal có lỗi không

---

## 📝 GHI CHÚ

- Code có **chú thích chi tiết** bằng tiếng Việt
- Mỗi component đều có giải thích cách hoạt động
- CSS được tổ chức rõ ràng theo component
- Dữ liệu JSON dễ dàng chỉnh sửa

---

## 🎉 HOÀN THÀNH!

Bạn đã có một website tin tức hoàn chỉnh với:
- ✅ Routing
- ✅ Dữ liệu động (JSON)
- ✅ Authentication (Đăng ký/Đăng nhập)
- ✅ API thật
- ✅ Giao diện đẹp
- ✅ Responsive

**Chúc bạn học tốt!** 🚀

---

## 📜 LICENSE

MIT License - Tự do sử dụng cho mục đích học tập.

