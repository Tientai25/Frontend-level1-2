module.exports = async function (req, res, proceed) {
  
  // Check nếu user chưa được authenticate
  if (!req.user) {
    return res.status(401).json({
      err: 1,
      msg: 'Vui lòng đăng nhập trước'
    });
  }
  
  // Kiểm tra role
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      err: 1,
      msg: 'Bạn không có quyền truy cập. Chỉ admin mới thực hiện được!'
    });
  }
  
  return proceed();
};
