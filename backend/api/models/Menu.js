module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      maxLength: 100
    },
    
    path: {
      type: 'string',
      required: true
    },
    
    icon: {
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

