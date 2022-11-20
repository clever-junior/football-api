import TeamRepository from '../../../repositories/implementations/TeamsRepository';
import Match from '../../../database/models/Match';
import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import createMatchValidations, { validateIds } from './CreateMatchValidations';
import ICreateMatchDTO from './ICreateMatchDTO';

export default class CreateMatchUseCase {
  constructor(
    private matchRepository: MatchRepository,
    private teamRepository: TeamRepository,
  ) {}

  async execute(data: ICreateMatchDTO): Promise<Match> {
    createMatchValidations(data);

    const ids = [data.awayTeam, data.homeTeam];

    validateIds(this.teamRepository, ids);

    const match = await this.matchRepository.create(data);

    return match;
  }
}
