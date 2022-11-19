import { Request, Response } from 'express';
import ReadAllMatchesUseCase from './ReadAllMatchesUseCase';

export default class ReadAllMatchesController {
  constructor(
    private readAllMatchesUseCase: ReadAllMatchesUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const query = req.query.inProgress;

    const inProgress = query === 'true';

    const matches = await this.readAllMatchesUseCase.execute(inProgress);

    if (matches) {
      return res.status(200).json(matches);
    }

    return res.sendStatus(500);
  }
}
