import { useState, useEffect } from 'react';
import './ServicesPage.css';
import API_BASE_URL from '../config/api';

function ServicesPage() {
  // State lưu danh sách dịch vụ
  const [services, setServices] = useState([]);
  
  // Lấy dữ liệu dịch vụ từ CẢ local JSON VÀ backend API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // 1. Lấy từ local JSON
        const localResponse = await fetch('/data/services.json');
        const localData = await localResponse.json();
        
        // 2. Lấy từ backend API
        let backendData = [];
        try {
          const backendResponse = await fetch(`${API_BASE_URL}/service`);
          if (backendResponse.ok) {
            backendData = await backendResponse.json();
          }
        } catch (apiError) {
          console.warn('Backend API không khả dụng:', apiError);
        }
        
        // 3. Gộp cả 2 nguồn
        const mergedData = [...backendData, ...localData];
        setServices(mergedData);
      } catch (error) {
        console.error('Lỗi khi tải dịch vụ:', error);
      }
    };
    
    fetchServices();
  }, []);
  
  return (
    <div className="services-page">
      <h2 className="page-title">Dịch Vụ Của Chúng Tôi</h2>
      <p className="page-description">
        Chúng tôi cung cấp các dịch vụ chuyên nghiệp, đáp ứng mọi nhu cầu của khách hàng
      </p>
      
      {/* Danh sách dịch vụ */}
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p className="service-description">{service.description}</p>
            <div className="service-price">{service.price}</div>
            
            {/* Danh sách tính năng */}
            <ul className="features-list">
              {service.features.map((feature, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="btn-service">Liên hệ ngay</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
