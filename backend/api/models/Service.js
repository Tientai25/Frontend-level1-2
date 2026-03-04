module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      maxLength: 255
    },
    
    description: {
      type: 'string',
      required: true
    },
    
    price: {
      type: 'string',
      required: true
    },
    
    features: {
      type: 'json',
      defaultsTo: []
    },
    
    icon: {
      type: 'string',
      allowNull: true
    },
    
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },

  },

};

