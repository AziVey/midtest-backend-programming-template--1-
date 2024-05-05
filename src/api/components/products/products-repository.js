const { Product } = require('../../../models');

/**
 * Get a list of products
 * @returns {Promise}
 */
async function getProducts() {
  return Product.find({});
}

/**
 * Get product detail
 * @param {string} id - product real ID
 * @returns {Promise}
 */
async function getProduct(id) {
  return Product.findById(id);
}

/**
 * Create new product
 * @param {string} ProductID - id produk
 * @param {string} productName - nama produk
 * @param {string} price - harga
 * @returns {Promise}
 */
async function createProduct(productID, productName, price) {
  return Product.create({
    productID,
    productName,
    price,
  });
}

/**
 * Update existing product
 * @param {string} ProductID - id produk
 * @param {string} productName - nama produk
 * @param {string} price - harga
 * @returns {Promise}
 */
async function updateProduct(id, productID, productName, price) {
  return Product.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        productID,
        productName,
        price,
      },
    }
  );
}

/**
 * Delete a product
 * @param {string} id - real product id
 * @returns {Promise}
 */
async function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

/**
 * Get product by productID to prevent duplicate productID
 * @param {string} ProductID - id produk
 * @returns {Promise}
 */
async function getProductByID(productID) {
  return Product.findOne({ productID });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByID,
};
