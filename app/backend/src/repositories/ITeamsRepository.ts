import Team from '../database/models/Team';

export default interface ITeamsRepository {
  readAll(): Promise<Team[]>;
  readOne(id: number | string): Promise<Team | null>;
}
