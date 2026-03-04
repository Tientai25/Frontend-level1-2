module.exports = {

  attributes: {
    fullName: {
      type: 'string',
      required: true,
      maxLength: 255,
      columnName: 'fullname'
    },
    
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 255
    },
    
    password: {
      type: 'string',
      required: true,
      minLength: 6
    },
    
    birth: {
      type: 'string',
      allowNull: true
    },
    
    role: {
      type: 'string',
      isIn: ['user', 'admin'],
      defaultsTo: 'user'
    },

  },
  
  beforeCreate: async function (values, proceed) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(values.password, 10);
    values.password = hashedPassword;
    return proceed();
  },
  
  customToJSON: function() {
    return _.omit(this, ['password']);
  },

};

