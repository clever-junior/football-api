import IMatchesRepository from '../../../repositories/IMatchesRepository';
import IUpdateMatchDTO from './UpdateMatchDTO';

export default class UpdateMatchUseCase {
  constructor(
    private matchRepository: IMatchesRepository,
  ) {}

  async execute(data: IUpdateMatchDTO, id: number) {
    await this.matchRepository.update(data, id);
  }
}
