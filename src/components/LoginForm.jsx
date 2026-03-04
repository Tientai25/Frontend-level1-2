import { useState } from 'react';
import './AuthForm.css';

function LoginForm({ onSubmit, onSwitchToRegister, isLoading }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    // Kiểm tra email
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
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
      
      {/* Quên mật khẩu */}
      <div className="form-options">
        <button type="button" className="link-button">
          Quên mật khẩu?
        </button>
      </div>
      
      {/* Button submit */}
      <button type="submit" className="btn-submit" disabled={isLoading}>
        {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
      </button>
      
      {/* Chuyển sang đăng ký */}
      <div className="form-footer">
        <p>
          Chưa có tài khoản?{' '}
          <button type="button" className="link-button" onClick={onSwitchToRegister}>
            Đăng ký ngay
          </button>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
