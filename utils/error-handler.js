function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res.status(500).json({
    status: err.status || 500,
    error: err.essage || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
}

module.exports = errorHandler;