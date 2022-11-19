import { Request, Response } from 'express';
import ReadOneTeamUseCase from './ReadOneTeamUseCase';

export default class ReadOneTeamController {
  constructor(
    private readOneTeamUseCase: ReadOneTeamUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const team = await this.readOneTeamUseCase.execute({ id });

    if (team) {
      return res.status(200).json(team);
    }

    return res.sendStatus(500);
  }
}
