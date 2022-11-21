import { Request, Response } from 'express';
import ITeamsRepository from '../../../repositories/ITeamsRepository';
import CreateMatchUseCase from './CreateMatchUseCases';

export default class CreateMatchController {
  constructor(
    private createMatchUseCase: CreateMatchUseCase,
    private teamRepository: ITeamsRepository,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const { homeTeam, awayTeam } = data;

    const validateHomeTeam = this.teamRepository.readOne(homeTeam);

    const validateAwayTeam = this.teamRepository.readOne(awayTeam);

    if (!validateHomeTeam || !validateAwayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const match = await this.createMatchUseCase.execute(data);

    return res.status(201).json(match);
  }
}
