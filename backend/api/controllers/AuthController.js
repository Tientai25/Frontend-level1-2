module.exports = {
  
  register: async function (req, res) {
    try {
      const { fullName, email, password, birth } = req.body;
      
      // Validate input
      if (!fullName || !email || !password) {
        return res.badRequest({
          err: 1,
          msg: 'Vui lòng điền đầy đủ thông tin'
        });
      }
      
      // Kiểm tra email đã tồn tại
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          err: 1,
          msg: 'Email đã được sử dụng'
        });
      }
      
      // Tạo user mới (password sẽ tự động hash trong beforeCreate)
      const newUser = await User.create({
        fullName,
        email,
        password,
        birth: birth || null,
        role: 'user'
      }).fetch();
      
      return res.status(201).json({
        err: 0,
        msg: 'Đăng ký thành công!',
        data: newUser
      });
      
    } catch (error) {
      sails.log.error('Register error:', error);
      return res.serverError({
        err: 1,
        msg: 'Đăng ký thất bại',
        error: error.message
      });
    }
  },
  
  /**
   * Đăng nhập
   * POST /api/v1/auth/login
   */
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.badRequest({
          err: 1,
          msg: 'Vui lòng nhập email và password'
        });
      }
      
      // Tìm user theo email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          err: 1,
          msg: 'Email không tồn tại'
        });
      }
      
      // So sánh password
      const isPasswordMatch = await sails.helpers.comparePassword(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          err: 1,
          msg: 'Mật khẩu không đúng'
        });
      }
      
      // Tạo JWT token
      const token = await sails.helpers.generateJwt(user.id, user.email);
      
      // Tính expiredAt (24 giờ sau)
      const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      return res.json({
        err: 0,
        msg: 'Đăng nhập thành công',
        token,
        expiredAt,
        user: {
          id: user.id,
          name: user.fullName,
          email: user.email,
          birth: user.birth,
          role: user.role
        }
      });
      
    } catch (error) {
      sails.log.error('Login error:', error);
      return res.serverError({
        err: 1,
        msg: 'Đăng nhập thất bại',
        error: error.message
      });
    }
  },
  
  /**
   * Lấy thông tin user hiện tại
   * GET /api/v1/auth/me
   * Requires: isAuthenticated policy
   */
  me: async function (req, res) {
    try {
      // req.user đã được gắn bởi isAuthenticated policy
      return res.json({
        err: 0,
        msg: 'Lấy thông tin thành công',
        user: {
          id: req.user.id,
          name: req.user.fullName,
          email: req.user.email,
          birth: req.user.birth,
          role: req.user.role
        }
      });
    } catch (error) {
      return res.serverError({
        err: 1,
        msg: 'Lỗi khi lấy thông tin user',
        error: error.message
      });
    }
  },
  
  /**
   * Đăng xuất (client-side xóa token)
   * POST /api/v1/auth/logout
   */
  logout: async function (req, res) {
    return res.json({
      err: 0,
      msg: 'Đăng xuất thành công'
    });
  }

};

