import { Request, Response } from 'express';
import HomeLeaderBoardUseCase from './HomeLeaderBoardUseCase';

export default class HomeLeaderBoardController {
  constructor(
    private leaderBoardHomeUseCase: HomeLeaderBoardUseCase,
  ) {}

  async handle(_req: Request, res: Response) {
    const leaderBoard = await this.leaderBoardHomeUseCase.execute();

    res.status(200).json(leaderBoard);
  }
}
