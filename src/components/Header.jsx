import './Header.css';
import Modal from './Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import NotificationModal from './NotificationModal';

import useAuth from '../hooks/useAuth';
import useModal from '../hooks/useModal';
import useNotification from '../hooks/useNotification';

function Header() {
  const { showNotification, notification, notify, closeNotification } = useNotification();
  
  const {
    showLoginModal,
    showRegisterModal,
    openLoginModal,
    openRegisterModal,
    closeAllModals,
    switchToLogin,
    switchToRegister,
    setShowLoginModal,
    setShowRegisterModal
  } = useModal();
  
  // ✅ Sử dụng Auth Hook (Controller) - Truyền callback để notify và mở modal
  const {
    currentUser,
    isLoading,
    handleRegister,
    handleLogin,
    handleLogout
  } = useAuth(notify, openLoginModal);
  
  // Wrapper functions để giữ nguyên logic cũ
  const onRegisterSubmit = async (formData) => {
    const result = await handleRegister(formData);
    
    // Hiển thị thông báo
    notify(result.success ? 'success' : 'error', result.message);
    
    // Nếu thành công, đóng modal và chuyển sang đăng nhập
    if (result.success) {
      setShowRegisterModal(false);
      setTimeout(() => {
        setShowLoginModal(true);
      }, 2000);
    }
  };
  
  const onLoginSubmit = async (formData) => {
    const result = await handleLogin(formData);
    
    // Hiển thị thông báo
    notify(result.success ? 'success' : 'error', result.message);
    
    // Nếu thành công, đóng modal
    if (result.success) {
      setShowLoginModal(false);
    }
  };
  
  const onLogout = () => {
    handleLogout();
    notify('success', 'Đã đăng xuất thành công!');
  };
  
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <h1>Tin Tức 24h</h1>
              <p>Cập nhật mọi lúc mọi nơi</p>
            </div>
            
            {/* Thông tin liên hệ */}
            <div className="header-info">
              <div className="info-item">
                <span>Hotline: 1900 123456</span>
              </div>
              <div className="info-item">
                <span>Email: info@tintuc24h.vn</span>
              </div>
            </div>
        
            <div className="header-auth">
              {currentUser ? (
                <div className="user-menu">
                  <span className="user-greeting">
                    Xin chào, <strong>{currentUser.name || currentUser.fullName}</strong>
                  </span>
                  <button className="btn-logout" onClick={onLogout}>
                    Đăng xuất
                  </button>
                </div>
              ) : (
                // Hiển thị khi chưa đăng nhập
                <div className="auth-buttons">
                  <button 
                    className="btn-login" 
                    onClick={openLoginModal}
                  >
                    Đăng nhập
                  </button>
                  <button 
                    className="btn-register" 
                    onClick={openRegisterModal}
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Modal Đăng nhập */}
      <Modal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        title="Đăng nhập"
      >
        <LoginForm 
          onSubmit={onLoginSubmit}
          onSwitchToRegister={switchToRegister}
          isLoading={isLoading}
        />
      </Modal>
      
      {/* Modal Đăng ký */}
      <Modal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        title="Đăng ký tài khoản"
      >
        <RegisterForm 
          onSubmit={onRegisterSubmit}
          onSwitchToLogin={switchToLogin}
          isLoading={isLoading}
        />
      </Modal>
      
      {/* Modal Thông báo */}
      <NotificationModal 
        isOpen={showNotification}
        onClose={closeNotification}
        type={notification.type}
        message={notification.message}
      />
    </>
  );
}

export default Header;
