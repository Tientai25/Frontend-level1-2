import API_BASE_URL from '../config/api.js';

const formatDateTime = (date) => {
  const vnDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  const year = vnDate.getUTCFullYear();
  const month = String(vnDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(vnDate.getUTCDate()).padStart(2, '0');
  const hours = String(vnDate.getUTCHours()).padStart(2, '0');
  const minutes = String(vnDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(vnDate.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
                                                                                                                                                                 
const authService = {

  register: async (userData) => {
    try {
      // Gọi API đăng ký từ backend
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: userData.fullName,  
          email: userData.email,
          birth: userData.birth || null,  
          password: userData.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok || data.err !== 0) {
        throw new Error(data.msg || 'Đăng ký thất bại');
      }
      
      return {
        success: true,
        message: data.msg || 'Đăng ký thành công!',
        data: data.data
      };
      
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Đăng ký thất bại'
      };
    }
  },

  login: async (credentials) => {
    try {
      // Gọi API login từ backend
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok || data.err !== 0) {
        throw new Error(data.msg || 'Đăng nhập thất bại');
      }
      
      // Backend đã trả về đúng format: { err, msg, token, expiredAt, user }
      const authData = {
        err: data.err,
        msg: data.msg,
        token: data.token,
        expiredAt: data.expiredAt,
        user: data.user
      };
      
      // Lưu toàn bộ vào localStorage
      authService.saveAuthData(authData);
      
      return {
        success: true,
        message: authData.msg,
        data: authData.user
      };
      
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Đăng nhập thất bại'
      };
    }
  },

  saveAuthData: (authData) => {
    localStorage.setItem('auth', JSON.stringify(authData));
  },

  getAuthData: () => {
    const authStr = localStorage.getItem('auth');
    return authStr ? JSON.parse(authStr) : null;
  },

  isTokenValid: () => {
    const authData = authService.getAuthData();
    if (!authData || !authData.expiredAt) return false;
    
    try {
      const expiredTime = new Date(authData.expiredAt).getTime();
      const currentTime = Date.now();
      return currentTime < expiredTime;
    } catch (error) {
      return false;
    }
  },

  getToken: () => {
    if (!authService.isTokenValid()) {
      authService.logout();
      return null;
    }
    const authData = authService.getAuthData();
    return authData ? authData.token : null;
  },

  /**
   * Đăng xuất
   */
  logout: () => {
    localStorage.removeItem('auth');
  },

  /**
   * Lấy thông tin user hiện tại
   * @returns {Object|null} - Thông tin user hoặc null
   */
  getCurrentUser: () => {
    // Kiểm tra token còn hạn không
    if (!authService.isTokenValid()) {
      authService.logout();
      return null;
    }
    
    const authData = authService.getAuthData();
    return authData ? authData.user : null;
  },

  isLoggedIn: () => {
    return authService.getToken() !== null && authService.isTokenValid();
  },

  fetchWithAuth: async (url, options = {}) => {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Vui lòng đăng nhập');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    // Nếu token hết hạn (401), tự động logout
    if (response.status === 401) {
      authService.logout();
      throw new Error('Token hết hạn, vui lòng đăng nhập lại');
    }
    
    return response;
  }
};

export default authService;
