import { useState, useEffect } from 'react';
import './HomePage.css';
import API_BASE_URL from '../config/api';

function HomePage() {
  // State lưu danh sách slider
  const [slides, setSlides] = useState([]);
  // State lưu slide hiện tại (bắt đầu từ 0)
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Lấy dữ liệu slider từ CẢ local JSON VÀ backend API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // 1. Lấy từ local JSON
        const localResponse = await fetch('/data/slider.json');
        const localData = await localResponse.json();
        
        // 2. Lấy từ backend API
        let backendData = [];
        try {
          const backendResponse = await fetch(`${API_BASE_URL}/slider`);
          if (backendResponse.ok) {
            backendData = await backendResponse.json();
          }
        } catch (apiError) {
          console.warn('Backend API không khả dụng:', apiError);
        }
        
        // 3. Gộp cả 2 nguồn
        const mergedData = [...backendData, ...localData];
        setSlides(mergedData);
      } catch (error) {
        console.error('Lỗi khi tải slider:', error);
      }
    };
    
    fetchSlides();
  }, []);
  
  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); 
    
    // Cleanup: Hủy timer khi component bị xóa
    return () => clearInterval(timer);
  }, [slides]);
  
  // Hàm chuyển slide thủ công
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="home-page">
      <h2 className="page-title">Chào mừng đến Tin Tức 24h</h2>
      
      {/* Slider */}
      <div className="slider">
        {slides.length > 0 && (
          <div className="slide">
            <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
            <div className="slide-content">
              <h3>{slides[currentSlide].title}</h3>
              <p>{slides[currentSlide].description}</p>
              <a href={slides[currentSlide].link} className="btn">Xem thêm →</a>
            </div>
          </div>
        )}
        
        {/* Dots điều hướng */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Giới thiệu */}
      <div className="intro">
        <div className="intro-card">
          <h3>Tin tức cập nhật</h3>
          <p>Cập nhật tin tức nhanh chóng, chính xác 24/7</p>
        </div>
        <div className="intro-card">
          <h3>Dịch vụ chuyên nghiệp</h3>
          <p>Đội ngũ chuyên gia giàu kinh nghiệm</p>
        </div>
        <div className="intro-card">
          <h3>Kết nối ngân hàng</h3>
          <p>Hợp tác với các ngân hàng uy tín</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
