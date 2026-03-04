import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components (giống directive trong AngularJS)
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages (giống các state trong UI Router)
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BanksPage from './pages/BanksPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
     
      <Header />
       
      <Menu />
      
      {/* Main Content - Nội dung chính thay đổi theo route */}
      <main className="main-content">
        <div className="container">
          <Routes>
            {/* Route trang chủ - KHÔNG CẦN ĐĂNG NHẬP */}
            <Route path="/" element={<HomePage />} />
            
            {/* Route trang dịch vụ - KHÔNG CẦN ĐĂNG NHẬP */}
            <Route path="/dich-vu" element={<ServicesPage />} />
            
            {/* Route trang ngân hàng - KHÔNG CẦN ĐĂNG NHẬP */}
            <Route path="/ngan-hang" element={<BanksPage />} />
            
            {/* Route trang tin tức - YÊU CẦU ĐĂNG NHẬP */}
            <Route 
              path="/tin-tuc" 
              element={
                <ProtectedRoute>
                  <NewsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Route trang liên hệ - YÊU CẦU ĐĂNG NHẬP */}
            <Route 
              path="/lien-he" 
              element={
                <ProtectedRoute>
                  <ContactPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </main>
    
      {/* Footer - Luôn hiển thị */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
