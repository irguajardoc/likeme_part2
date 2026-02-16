

module.exports = function errorHandler(err, req, res, _next) {
  
  console.error('[ERROR]', err);

  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    error: message,
  });
};
