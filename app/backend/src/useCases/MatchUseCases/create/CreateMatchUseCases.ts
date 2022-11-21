import Match from '../../../database/models/Match';
import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import ICreateMatchDTO from './ICreateMatchDTO';

export default class CreateMatchUseCase {
  constructor(
    private matchRepository: MatchRepository,
  ) {}

  async execute(data: ICreateMatchDTO): Promise<Match> {
    const match = await this.matchRepository.create(data);

    return match;
  }
}
