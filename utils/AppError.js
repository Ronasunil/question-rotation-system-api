class AppError extends Error {
  constructor(err, statusCode) {
    super(err);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
