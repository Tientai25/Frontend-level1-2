import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Thông tin công ty */}
          <div className="footer-section">
            <h3>Tin Tức 24h</h3>
            <p>Website tin tức cập nhật nhanh nhất</p>
            <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
          </div>
          
          {/* Liên kết nhanh */}
          <div className="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li>Giới thiệu</li>
              <li>Liên hệ</li>
              <li>Quảng cáo</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>
          
          {/* Mạng xã hội */}
          <div className="footer-section">
            <h4>Theo dõi chúng tôi</h4>
            <div className="social-links">
              <span className="social-icon">Facebook</span>
              <span className="social-icon">Instagram</span>
              <span className="social-icon">Twitter</span>
              <span className="social-icon">YouTube</span>
            </div>
          </div>
        </div>
        
        {/* Bản quyền */}
        <div className="footer-bottom">
          <p>{currentYear} Tin Tức 24h. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
