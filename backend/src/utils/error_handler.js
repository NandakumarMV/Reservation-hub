class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.isOperational = true;
  }
}

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!err.isOperational) {
    statusCode = 500;
    message = "Something Went Wrong !";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
export { AppError, errorHandler };
