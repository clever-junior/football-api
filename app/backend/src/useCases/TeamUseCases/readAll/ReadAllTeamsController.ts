import { Request, Response } from 'express';
import ReadAllTeamsUseCase from './ReadAllTeamsUseCase';

export default class ReadAllTeamsController {
  constructor(
    private readAllTeamsUseCase: ReadAllTeamsUseCase,
  ) {}

  async handle(_req: Request, res: Response): Promise<Response> {
    const teams = await this.readAllTeamsUseCase.execute();

    if (teams) {
      return res.status(200).json(teams);
    }

    return res.sendStatus(500);
  }
}
