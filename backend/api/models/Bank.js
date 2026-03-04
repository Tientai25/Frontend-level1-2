module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      maxLength: 100
    },
    
    fullName: {
      type: 'string',
      required: true,
      columnName: 'fullname'
    },
    
    logo: {
      type: 'string',
      allowNull: true
    },
    
    description: {
      type: 'string',
      allowNull: true
    },
    
    services: {
      type: 'json',
      defaultsTo: []
    },
    
    hotline: {
      type: 'string',
      allowNull: true
    },
    
    website: {
      type: 'string',
      allowNull: true
    },
    
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },

  },

};

