module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
      maxLength: 500
    },
    
    content: {
      type: 'string',
      required: true
    },
    
    category: {
      type: 'string',
      required: true,
      maxLength: 100
    },
    
    image: {
      type: 'string',
      allowNull: true
    },
    
    author: {
      type: 'string',
      allowNull: true
    },
    
    views: {
      type: 'number',
      defaultsTo: 0
    },
    
    isPublished: {
      type: 'boolean',
      defaultsTo: true
    },

  },

};

