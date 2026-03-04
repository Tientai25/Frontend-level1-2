import { useState, useEffect } from 'react';
import authService from '../services/authService';

function useAuth(onNotify, onShowLoginModal) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const checkTokenExpiry = () => {
      // Kiểm tra token còn hạn không
      if (currentUser && !authService.isTokenValid()) {
        // Token hết hạn → Logout và hiển thị modal đăng nhập
        authService.logout();
        setCurrentUser(null);
        
        // Hiển thị thông báo
        if (onNotify) {
          onNotify('error', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
        }
        
        setTimeout(() => {
          if (onShowLoginModal) {
            onShowLoginModal();
          }
        }, 2000);
      }
    };
    
    const interval = setInterval(checkTokenExpiry, 60 * 1000);
    
    return () => clearInterval(interval);
  }, [currentUser, onNotify, onShowLoginModal]);

  // Hàm xử lý đăng ký
  const handleRegister = async (formData) => {
    setIsLoading(true);
    
    // Gọi API đăng ký
    const result = await authService.register(formData);
    
    setIsLoading(false);
    
    return result;
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    // Gọi API đăng nhập
    const result = await authService.login(formData);
    
    setIsLoading(false);
    
    // Nếu thành công, cập nhật user
    if (result.success) {
      setCurrentUser(result.data);
    }
    
    return result;
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return {
    currentUser,
    isLoading,
    handleRegister,
    handleLogin,
    handleLogout
  };
}

export default useAuth;
