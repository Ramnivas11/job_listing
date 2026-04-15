'use strict';

/**
 * notFound — handles requests to undefined routes (404)
 */
const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

/**
 * errorHandler — global Express error handler (500 catch-all)
 */
const errorHandler = (err, req, res, _next) => {
  const isDev = process.env.NODE_ENV === 'development';
  const statusCode = err.status || err.statusCode || 500;

  console.error(`[ERROR] ${statusCode} — ${err.message}`);
  if (isDev) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error.',
    ...(isDev && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
