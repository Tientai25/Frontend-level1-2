import { useState } from 'react';
import './AuthForm.css';

function RegisterForm({ onSubmit, onSwitchToLogin, isLoading }) {
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    birth: '',
    password: '',
    confirmPassword: ''
  });
  
  // State lưu lỗi validation
  const [errors, setErrors] = useState({});
  
  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Xóa lỗi khi người dùng nhập lại
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Hàm validate form
  const validate = () => {
    const newErrors = {};
    
    // Kiểm tra họ tên
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }
    
    // Kiểm tra email
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    // Kiểm tra ngày sinh (optional - không bắt buộc)
    if (formData.birth) {
      const birthDate = new Date(formData.birth);
      const today = new Date();
      if (birthDate >= today) {
        newErrors.birth = 'Ngày sinh không hợp lệ';
      }
    }
    
    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    // Kiểm tra xác nhận mật khẩu
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Hàm xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate trước khi submit
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {/* Họ tên */}
      <div className="form-group">
        <label>Họ và tên</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Nhập họ và tên"
          className={errors.fullName ? 'error' : ''}
        />
        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
      </div>
      
      {/* Email */}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      
      {/* Ngày sinh */}
      <div className="form-group">
        <label>Ngày sinh (tùy chọn)</label>
        <input
          type="date"
          name="birth"
          value={formData.birth}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
          className={errors.birth ? 'error' : ''}
        />
        {errors.birth && <span className="error-message">{errors.birth}</span>}
      </div>
      
      {/* Mật khẩu */}
      <div className="form-group">
        <label>Mật khẩu</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Nhập mật khẩu"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      
      {/* Xác nhận mật khẩu */}
      <div className="form-group">
        <label>Xác nhận mật khẩu</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Nhập lại mật khẩu"
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>
      
      {/* Button submit */}
      <button type="submit" className="btn-submit" disabled={isLoading}>
        {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
      </button>
      
      {/* Chuyển sang đăng nhập */}
      <div className="form-footer">
        <p>
          Đã có tài khoản?{' '}
          <button type="button" className="link-button" onClick={onSwitchToLogin}>
            Đăng nhập ngay
          </button>
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;
