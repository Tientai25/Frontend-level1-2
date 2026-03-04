const API_BASE_URL = 'https://699e9ea878dda56d396ac773.mockapi.io/api/v1';

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
      // Bước 1: Kiểm tra email đã tồn tại chưa
      const checkResponse = await fetch(`${API_BASE_URL}/users?email=${userData.email}`);
      
      // Xử lý trường hợp 404 (không tìm thấy = email chưa tồn tại = OK)
      let existingUsers = [];
      if (checkResponse.ok) {
        existingUsers = await checkResponse.json();
      }
      
      if (existingUsers.length > 0) {
        throw new Error('Email đã được sử dụng');
      }
      
      // Bước 2: Tạo tài khoản mới
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: userData.fullName,  
          email: userData.email,
          birth: userData.birth || null,  
          password: userData.password,
          createdAt: formatDateTime(new Date())
        }),
      });
      
      if (!response.ok) {
        throw new Error('Đăng ký thất bại');
      }
      
      const data = await response.json();
      return {
        success: true,
        message: 'Đăng ký thành công!',
        data: data
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
      // Tìm user theo email
      const response = await fetch(`${API_BASE_URL}/users?email=${credentials.email}`);
      
      // Xử lý trường hợp 404 (không tìm thấy = email không tồn tại)
      let users = [];
      if (response.ok) {
        users = await response.json();
      }
      
      if (users.length === 0) {
        throw new Error('Email không tồn tại');
      }
      
      const user = users[0];
      
      // Kiểm tra mật khẩu
      if (user.password !== credentials.password) {
        throw new Error('Mật khẩu không đúng');
      }
      
      const authData = {
        err: 0,
        msg: `Đăng nhập thành công.`,
        token: 'token_' + Date.now() + '_' + Math.random().toString(36).substring(2),
        expiredAt: formatDateTime(new Date(Date.now() + 24 * 60 * 60 * 1000)), 
        user: {
          // email: user.email,
          // id: user.id,
          birth: user.birth || null,
          name: user.fullname || user.fullName,
        }
      };
      
      // Lưu toàn bộ vào localStorage (1 object duy nhất)
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
