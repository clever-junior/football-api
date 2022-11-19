import { Request, Response } from 'express';
import LoginUseCase from './LoginUseCase';

export default class LoginController {
  constructor(
    private loginUseCase: LoginUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const token = await this.loginUseCase.execute({ email, password });

    if (!token) { return res.status(500).json({ message: 'Error' }) }

    return res.status(200).json({ token });
  }
}
