import { Request, Response } from 'express';
import AwayLeaderBoardUseCase from './AwayLeaderBoardUseCase';

export default class AwayLeaderBoardController {
  constructor(
    private leaderBoardAwayUseCase: AwayLeaderBoardUseCase,
  ) {}

  async handle(_req: Request, res: Response) {
    const leaderBoard = await this.leaderBoardAwayUseCase.execute();

    res.status(200).json(leaderBoard);
  }
}
