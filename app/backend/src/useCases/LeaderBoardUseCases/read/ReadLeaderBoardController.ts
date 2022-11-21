import { Request, Response } from 'express';
import ReadLeaderBoardUseCase from './ReadLeaderBoardUseCase';

export default class ReadLeaderBoardController {
  constructor(
    private leaderBoardReadUseCase: ReadLeaderBoardUseCase,
  ) {}

  async handle(_req: Request, res: Response) {
    const leaderBoard = await this.leaderBoardReadUseCase.execute();

    res.status(200).json(leaderBoard);
  }
}
