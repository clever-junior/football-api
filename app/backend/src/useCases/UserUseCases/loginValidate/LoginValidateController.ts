import { Request, Response } from 'express';
import LoginUseCase from './LoginValidateUseCase';

export default class LoginValidateController {
  static handle(req: Request, res: Response): Response {
    const { authorization } = req.headers;

    if (authorization) {
      const user = LoginUseCase.execute(authorization);
      if (user) {
        const { role } = user;
        return res.status(200).json({ role });
      }
    }

    return res.status(401).json({ message: 'Invalid token' });
  }
}
