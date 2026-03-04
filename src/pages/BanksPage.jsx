import { useState, useEffect } from 'react';
import './BanksPage.css';

function BanksPage() {
  // State lưu danh sách ngân hàng
  const [banks, setBanks] = useState([]);
  
  // Lấy dữ liệu ngân hàng từ JSON
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch('/data/banks.json');
        const data = await response.json();
        setBanks(data);
      } catch (error) {
        console.error('Lỗi khi tải ngân hàng:', error);
      }
    };
    
    fetchBanks();
  }, []);
  
  return (
    <div className="banks-page">
      <h2 className="page-title">Ngân Hàng Đối Tác</h2>
      <p className="page-description">
        Chúng tôi hợp tác với các ngân hàng uy tín hàng đầu Việt Nam
      </p>
      
      {/* Danh sách ngân hàng */}
      <div className="banks-grid">
        {banks.map((bank) => (
          <div key={bank.id} className="bank-card">
            <div className="bank-header">
              <img src={bank.logo} alt={bank.name} className="bank-logo" />
              <div className="bank-info">
                <h3>{bank.name}</h3>
                <p className="bank-full-name">{bank.fullName}</p>
              </div>
            </div>
            
            <p className="bank-description">{bank.description}</p>
            
            {/* Dịch vụ ngân hàng */}
            <div className="bank-services">
              <h4>Dịch vụ:</h4>
              <ul>
                {bank.services.map((service, index) => (
                  <li key={index}>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Thông tin liên hệ */}
            <div className="bank-contact">
              <div className="contact-item">
                <span>{bank.hotline}</span>
              </div>
              <div className="contact-item">
                <a href={bank.website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BanksPage;
