import IMatchesRepository from '../../../repositories/IMatchesRepository';
import Match from '../../../database/models/Match';

export default class ReadAllMatchesUseCase {
  constructor(
    private teamRepository: IMatchesRepository,
  ) {}

  async readAll(): Promise<Match[]> {
    const matches = await this.teamRepository.readAll();

    return matches;
  }

  async execute(inProgress: boolean): Promise<Match[]> {
    const matches = await this.teamRepository.readByInProgress(inProgress);

    return matches;
  }
}
