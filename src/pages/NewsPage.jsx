import { useState, useEffect } from 'react';
import './NewsPage.css';
import authService from '../services/authService';

function NewsPage() {
  const [allNews, setAllNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  
  // Lấy dữ liệu tin tức từ API (với token)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
  
        const response = await fetch('/data/news.json');
        const data = await response.json();
        
        setAllNews(data);
        setFilteredNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tải tin tức:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);
  
  // Lấy danh sách các danh mục (không trùng lặp)
  const categories = ['Tất cả', ...new Set(allNews.map(news => news.category))];
  
  // Hàm lọc tin tức theo danh mục
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    
    if (category === 'Tất cả') {
      setFilteredNews(allNews);
    } else {
      const filtered = allNews.filter(news => news.category === category);
      setFilteredNews(filtered);
    }
  };
  
  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  
  // Hàm chuyển trang
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll lên đầu trang khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };
  
  return (
    <div className="news-page">
      <h2 className="page-title">Tin Tức Mới Nhất</h2>
      
      {/* Thông báo trang protected */}
      <div className="protected-notice">
        <p>
          Trang này yêu cầu đăng nhập. Bạn đã xác thực thành công!
        </p>
      </div>
      
      {loading && <div className="loading"> Đang tải tin tức...</div>}
      {error && <div className="error-message">❌ {error}</div>}
      
      {!loading && !error && (
        <>
          {/* Bộ lọc danh mục */}
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => filterByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
      
          {/* Danh sách tin tức */}
          <div className="news-grid">
            {currentItems.map((news) => (
              <article key={news.id} className="news-card">
                <img src={news.image} alt={news.title} className="news-image" />
            
                <div className="news-content">
                  <div className="news-meta">
                    <span className="category-tag">{news.category}</span>
                    <span className="news-date">{news.date}</span>
                  </div>
              
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-summary">{news.summary}</p>
              
                  <div className="news-footer">
                    <span className="news-author">
                      {news.author}
                    </span>
                    <button className="btn-read-more">Đọc thêm</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
      
          {/* Thông báo khi không có tin tức */}
          {filteredNews.length === 0 && (
            <div className="no-news">
              <p>Không có tin tức nào trong danh mục này</p>
            </div>
          )}
          
          {/* Pagination */}
          {filteredNews.length > itemsPerPage && (
            <div className="pagination">
              <button 
                className="pagination-btn" 
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                Trước
              </button>
              
              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Hiển thị trang đầu, cuối, và các trang gần current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`pagination-number ${
                          currentPage === pageNumber ? 'active' : ''
                        }`}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="pagination-dots">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button 
                className="pagination-btn" 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Sau
              </button>
            </div>
          )}
          
        </>
      )}
    </div>
  );
}

export default NewsPage;
