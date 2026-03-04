module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
      maxLength: 255
    },
    
    image: {
      type: 'string',
      required: true
    },
    
    link: {
      type: 'string',
      allowNull: true
    },
    
    order: {
      type: 'number',
      defaultsTo: 0
    },
    
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },

  },

};

