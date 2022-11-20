import { Request, Response } from 'express';
import CreateMatchUseCase from './CreateMatchUseCases';

export default class CreateMatchController {
  constructor(
    private createMatchUseCase: CreateMatchUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const match = await this.createMatchUseCase.execute(data);

    if (!match) { return res.status(500).json({ message: 'Error' }); }

    return res.status(201).json(match);
  }
}
