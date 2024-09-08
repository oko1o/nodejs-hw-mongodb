import createHttpError from 'http-errors';

const errorHandler = (error, req, res, next) => {
  if (!error.status) {
    error = createHttpError(500, 'Something went wrong');
  }

  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || 'Something went wrong',
    data: error.expose ? error.message : 'Internal Server Error',
  });
};

export default errorHandler;
