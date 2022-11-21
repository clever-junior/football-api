import TeamRepository from '../../../repositories/implementations/TeamsRepository';
import Match from '../../../database/models/Match';
import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import ICreateMatchDTO from './ICreateMatchDTO';
import NotFoundError from '../../../errors/NotFoundError';

export default class CreateMatchUseCase {
  constructor(
    private matchRepository: MatchRepository,
    private teamRepository: TeamRepository,
  ) {}

  async execute(data: ICreateMatchDTO): Promise<Match> {
    const ids = [data.awayTeam, data.homeTeam];

    ids.forEach(async (id) => {
      const team = await this.teamRepository.readOne(id);

      if (!team) {
        throw new NotFoundError('There is no team with such id!');
      }
    });

    const match = await this.matchRepository.create(data);

    return match;
  }
}
