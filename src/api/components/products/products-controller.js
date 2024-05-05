const productsService = require('./products-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of products request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getProducts(request, response, next) {
  try {
    let products = await productsService.getProducts();

    if (request.query.sort) {
      const sortField = request.query.sort.split(':')[0];
      const sortOrder = request.query.sort.split(':')[1];

      products = products.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      });
    }

    if (request.query.search) {
      const searchQuery = request.query.search.split('=');
      const searchField = searchQuery[0];
      const searchTerm = searchQuery[1];

      const regex = new RegExp(searchTerm, 'i');

      products = products.filter((product) => {
        return regex.test(product[searchField]);
      });
    }

    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limit);

    // Paginate the products
    const paginatedProducts = products.slice(startIndex, endIndex);

    const result = {
      page_number: page,
      page_size: limit,
      count: paginatedProducts.length,
      total_pages: totalPages,
      has_previous_page: page > 1,
      has_next_page: endIndex < totalProducts,
      data: paginatedProducts,
    };
    return response.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getProduct(request, response, next) {
  try {
    const product = await productsService.getProduct(request.params.id);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown Product');
    }

    return response.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createProduct(request, response, next) {
  try {
    const productID = request.body.productID;
    const productName = request.body.productName;
    const price = request.body.price;

    // ProductID must be unique
    const idIsRegistered = await productsService.idIsRegistered(productID);
    if (idIsRegistered) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN, // mohon di ganti setelah semua selesai, edit di file error
        'Id is already registered'
      );
    }

    const success = await productsService.createProduct(
      productID,
      productName,
      price
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create product'
      );
    }

    return response.status(200).json({ productID, productName, price });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateProduct(request, response, next) {
  try {
    const id = request.params.id;
    const productID = request.body.productID;
    const productName = request.body.productName;
    const price = request.body.price;

    // ProdutID must be unique
    const idIsRegistered = await productsService.idIsRegistered(productID);
    if (idIsRegistered) {
      throw errorResponder(
        errorTypes.ID_ALREADY_TAKEN, // mohon di ganti
        'ID is already registered'
      );
    }

    const success = await productsService.updateProduct(
      id,
      productID,
      productName,
      price
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update product'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteProduct(request, response, next) {
  try {
    const id = request.params.id;

    const success = await productsService.deleteProduct(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete product'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
