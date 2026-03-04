const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h'; 

module.exports = {

  friendlyName: 'Generate JWT token',

  description: 'Tạo JWT token cho user authentication',

  inputs: {
    userId: {
      type: 'string',
      required: true,
      description: 'User ID để encode vào token'
    },
    email: {
      type: 'string',
      required: true,
      description: 'Email của user'
    }
  },

  exits: {
    success: {
      description: 'Token được tạo thành công'
    }
  },

  fn: async function (inputs, exits) {
    
    const payload = {
      userId: inputs.userId,
      email: inputs.email,
      iat: Math.floor(Date.now() / 1000)
    };
    
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
    
    return exits.success(token);
  }

};
