import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET as Secret;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  verify(token, secret, (err, _decoded) => {
    if (err) return res.status(401).json({ message: 'Token must be a valid token' });
  });

  next();
};

export default authMiddleware;
