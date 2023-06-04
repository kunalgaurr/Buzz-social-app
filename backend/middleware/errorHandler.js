const AppError = require('./AppError');

const errorHandler = (error, req, res, next) => {
  if (error.name === 'TypeError') {
    return res.status(404).json({
      success: false,
      name: 'TypeError',
      message: error.message,
    });
  }

  if (error.name === 'CastError') {
    return res.status(404).json({
      success: false,
      name: 'CastError',
      message: error.message,
    });
  }

  if (error.name === 'RangeError') {
    return res.status(404).json({
      success: false,
      name: 'RangeError',
      message: error.message,
    });
  }

  if (error.name === 'ReferenceError') {
    return res.status(404).json({
      success: false,
      name: 'ReferenceError',
      message: error.message,
    });
  }

  if (error.name === 'SyntaxError') {
    return res.status(404).json({
      success: false,
      name: 'SyntaxError',
      message: error.message,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      name: 'AppError',
      message: error.message,
    });
  }

  res.status(400).json({
    name: error.name,
    message: error.message,
  });
};

module.exports = errorHandler;
