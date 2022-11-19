import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err;

  if (status) {
    return res.status(status).json({ message });
  }

  return res.status(500).json({ message });
};

export default errorMiddleware;
