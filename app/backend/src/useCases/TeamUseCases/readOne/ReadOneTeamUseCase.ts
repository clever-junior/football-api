import ITeamsRepository from '../../../repositories/ITeamsRepository';
import Team from '../../../database/models/Team';
import IReadOneTeamDTO from './ReadOneTeamDTO';
import Error from '../../../errors';

export default class ReadOneTeamUseCase {
  constructor(
    private teamRepository: ITeamsRepository,
  ) {}

  async execute({ id }: IReadOneTeamDTO): Promise<Team | null> {
    if (!id) { Error.badRequest('User not found'); }

    const team = await this.teamRepository.readOne(id);

    if (team) { return team; }

    return null;
  }
}
