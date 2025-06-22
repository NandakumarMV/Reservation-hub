class AppError extends Error {
  constructor(message, statusCode = 500, devError = null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.devError = devError;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something Went Wrong!";
  const devError = err.devError || null;

  if (!err.isOperational) {
    console.error("[Uncaught Error]", err);
    statusCode = 500;
    message = "Something Went Wrong!";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(devError && { devError }),
  });
};

export { AppError, errorHandler };
