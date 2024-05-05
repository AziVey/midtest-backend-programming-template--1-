const joi = require('joi');

module.exports = {
  createProduct: {
    body: {
      productID: joi.string().min(1).max(10).required().label('Product ID'),
      productName: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Product Name'),
      price: joi.number().required().label('Price'),
    },
  },

  updateProduct: {
    body: {
      productID: joi.string().min(1).max(10).required().label('Product ID'),
      productName: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Product Name'),
      price: joi.number().required().label('Price'),
    },
  },
};
