const bcrypt = require('bcryptjs');

module.exports = {

  friendlyName: 'Compare password',

  description: 'So sánh password plaintext với hashed password',

  inputs: {
    password: {
      type: 'string',
      required: true,
      description: 'Password plaintext từ user'
    },
    hashedPassword: {
      type: 'string',
      required: true,
      description: 'Hashed password từ database'
    }
  },

  exits: {
    success: {
      description: 'Password đúng'
    }
  },

  fn: async function (inputs, exits) {
    
    const isMatch = await bcrypt.compare(inputs.password, inputs.hashedPassword);
    
    return exits.success(isMatch);
  }

};
