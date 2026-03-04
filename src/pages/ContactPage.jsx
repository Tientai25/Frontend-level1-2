import { useState } from 'react';
import './ContactPage.css';
import authService from '../services/authService';

function ContactPage() {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setStatus('');
    
      console.log('Form data:', formData);
      console.log('Token:', authService.getToken());
      
      setStatus('success');
      
      // Reset form sau 2 giây
      setTimeout(() => {
        setFormData({ subject: '', message: '' });
        setStatus('');
      }, 2000);
      
    } catch (error) {
      console.error('Lỗi:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="contact-page">
      <h1>Liên Hệ</h1>
      <p className="page-description">
        Trang này yêu cầu đăng nhập. Bạn đã xác thực thành công!
      </p>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Thông tin liên hệ</h2>
          <div className="info-item">
            <strong>Hotline:</strong>
            <p>1900 123456</p>
          </div>
          <div className="info-item">
            <strong>Email:</strong>
            <p>info@tintuc24h.vn</p>
          </div>
          <div className="info-item">
            <strong>Địa chỉ:</strong>
            <p>123 Đường ABC, Quận 1, TP.HCM</p>
          </div>
        </div>
        
        <div className="contact-form-wrapper">
          <h2>Gửi tin nhắn</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tiêu đề</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Nhập tiêu đề"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Nội dung</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nhập nội dung tin nhắn"
                rows="6"
                required
              />
            </div>
            
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
            </button>
            
            {status === 'success' && (
              <p className="success-message">
                Gửi tin nhắn thành công!
              </p>
            )}
            
            {status === 'error' && (
              <p className="error-message">
                Gửi tin nhắn thất bại. Vui lòng thử lại!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
