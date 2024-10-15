const errorHandler = async (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.status(statusCode).json({
    status: "Fail",
    statusCode,
    message,
  });
};

module.exports = { errorHandler };
