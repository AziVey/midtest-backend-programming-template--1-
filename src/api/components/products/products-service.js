const productsRepository = require('./products-repository');

/**
 * Get list of products
 * @returns {Array}
 */
async function getProducts() {
  const products = await productsRepository.getProducts();

  const results = [];
  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    results.push({
      id: product.id,
      productID: product.productID,
      productName: product.productName,
      price: product.price,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getProduct(id) {
  const product = await productsRepository.getProduct(id);

  // User not found
  if (!product) {
    return null;
  }

  return {
    id: product.id,
    productID: product.productID,
    productName: product.productName,
    price: product.price,
  };
}

/**
 * Create new product
 * @param {string} productID - idproduk
 * @param {string} productName - nama produk
 * @param {string} price - harga
 * @returns {boolean}
 */
async function createProduct(productID, productName, price) {
  try {
    await productsRepository.createProduct(productID, productName, price);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing product
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateProduct(id, productID, productName, price) {
  const product = await productsRepository.getProduct(id);

  // User not found
  if (!product) {
    return null;
  }

  try {
    await productsRepository.updateProduct(id, productID, productName, price);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteProduct(id) {
  const product = await productsRepository.getProduct(id);

  // Product not found
  if (!product) {
    return null;
  }

  try {
    await productsRepository.deleteProduct(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the ID is registered
 * @param {string} productID - product ID
 * @returns {boolean}
 */
async function idIsRegistered(productID) {
  const product = await productsRepository.getProductByID(productID);

  if (product) {
    return true;
  }

  return false;
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  idIsRegistered,
};
