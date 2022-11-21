import { Request, Response } from 'express';
import ReadAllMatchesUseCase from './ReadAllMatchesUseCase';

export default class ReadAllMatchesController {
  constructor(
    private readAllMatchesUseCase: ReadAllMatchesUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    let matches;

    if (inProgress) {
      const isInProgress = inProgress === 'true';
      matches = await this.readAllMatchesUseCase.execute(isInProgress);
    } else {
      matches = await this.readAllMatchesUseCase.readAll();
    }

    return res.status(200).json(matches);
  }
}
