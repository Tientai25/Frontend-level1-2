import { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage() {
  // State lưu danh sách slider
  const [slides, setSlides] = useState([]);
  // State lưu slide hiện tại (bắt đầu từ 0)
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Lấy dữ liệu slider từ JSON
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/data/slider.json');
        const data = await response.json();
        setSlides(data);
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
