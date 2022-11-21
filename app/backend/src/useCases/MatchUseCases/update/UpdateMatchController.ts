import { Request, Response } from 'express';
import UpdateMatchUseCase from './UpdateMatchUseCase';

export default class UpdateMatchController {
  constructor(
    private updateMatchUseCase: UpdateMatchUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    if (!data.homeTeamGoals || !data.awayTeamGoals) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!id) { return res.status(404).json({ message: 'Not found' }); }

    await this.updateMatchUseCase.execute(data, +id);

    return res.status(200).json({ message: 'Updated success' });
  }
}
