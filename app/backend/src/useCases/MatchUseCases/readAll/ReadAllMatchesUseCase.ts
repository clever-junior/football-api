import IMatchesRepository from '../../../repositories/IMatchesRepository';
import Match from '../../../database/models/Match';

export default class ReadAllMatchesUseCase {
  constructor(
    private teamRepository: IMatchesRepository,
  ) {}

  async execute(inProgress?: boolean): Promise<Match[]> {
    if (inProgress) {
      const matches = await this.teamRepository.readByInProgress(inProgress);

      return matches;
    }

    const matches = await this.teamRepository.readAll();

    return matches;
  }
}
