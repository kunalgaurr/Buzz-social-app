const errorHandler = require('../middleware/errorHandler');

const errorCatcher = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    return errorHandler(error, req, res, next);
  }
};

module.exports = errorCatcher;
