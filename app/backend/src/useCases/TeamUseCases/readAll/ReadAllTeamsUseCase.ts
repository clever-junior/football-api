import ITeamsRepository from '../../../repositories/ITeamsRepository';
import Team from '../../../database/models/Team';

export default class ReadAllTeamsUseCase {
  constructor(
    private teamRepository: ITeamsRepository,
  ) {}

  async execute(): Promise<Team[]> {
    const teams = await this.teamRepository.readAll();

    return teams;
  }
}
