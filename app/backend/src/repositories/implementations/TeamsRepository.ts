import Team from '../../database/models/Team';
import ITeamsRepository from '../ITeamsRepository';

export default class TeamRepository implements ITeamsRepository {
  constructor(
    private teamModel: typeof Team,
  ) {}

  async readAll(): Promise<Team[]> {
    const result = await this.teamModel.findAll();

    return result;
  }

  async readOne(id: number): Promise<Team | null> {
    const result = await this.teamModel.findOne({ where: { id } });

    return result;
  }
}
