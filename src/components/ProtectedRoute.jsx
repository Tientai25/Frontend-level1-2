import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

function ProtectedRoute({ children }) {
  // Kiểm tra đã đăng nhập và token còn hạn
  const isAuthenticated = authService.isLoggedIn();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
