/**
 * Error Handling Middleware
 */

/**
 * Global error handler
 */
function globalErrorHandler(err, req, res, next) {
  console.error("Global error:", err);
  
  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(statusCode).json({
    error: {
      message: message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    }
  });
}

/**
 * 404 handler for undefined routes
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      message: "Route not found",
      path: req.path
    }
  });
}

/**
 * Request logging middleware
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
}

module.exports = {
  globalErrorHandler,
  notFoundHandler,
  requestLogger,
}; 