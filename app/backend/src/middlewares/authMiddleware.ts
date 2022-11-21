import { NextFunction, Request, Response } from 'express';
import Token from '../utils/Token';
import UnauthorizedError from '../errors/UnauthorizedError';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  Token.validate(token);

  next();
};

export default authMiddleware;
