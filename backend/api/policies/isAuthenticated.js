const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  
  // Lấy token từ header
  const token = req.headers['authorization'];
  
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({
      err: 1,
      msg: 'Token không hợp lệ. Vui lòng đăng nhập!'
    });
  }
  
  try {
    const actualToken = token.substring(7);
    
    // Verify JWT token
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(actualToken, JWT_SECRET);
    
    // Tìm user trong database
    const user = await User.findOne({ id: decoded.userId });
    
    if (!user) {
      return res.status(401).json({
        err: 1,
        msg: 'User không tồn tại'
      });
    }
    
    // Gắn user vào request để sử dụng trong controller
    req.user = user;
    
    return proceed();
    
  } catch (error) {
    return res.status(401).json({
      err: 1,
      msg: 'Token không hợp lệ hoặc đã hết hạn',
      error: error.message
    });
  }
  
};
