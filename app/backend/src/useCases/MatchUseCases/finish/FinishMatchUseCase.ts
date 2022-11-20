import IMatchesRepository from '../../../repositories/IMatchesRepository';

export default class FinishMatchUseCase {
  constructor(
    private matchRepository: IMatchesRepository,
  ) {}

  async execute(id: number | string) {
    await this.matchRepository.updateInProgress(id);
  }
}
