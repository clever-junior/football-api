import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IMatchesRepository from '../IMatchesRepository';
import ICreateMatchDTO from '../../useCases/MatchUseCases/create/ICreateMatchDTO';

export default class MatchRepository implements IMatchesRepository {
  constructor(
    private matchModel: typeof Match,
  ) {}

  async create(body: ICreateMatchDTO): Promise<Match> {
    const data = { ...body, inProgress: true };

    const match = await this.matchModel.create(data);

    return match;
  }

  async readOne(id: number | string): Promise<Match | null> {
    const match = await this.matchModel.findOne({ where: { id } });

    return match;
  }

  async readAll(): Promise<Match[]> {
    const matches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }

  async readByInProgress(inProgress: boolean): Promise<Match[]> {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }

  async updateInProgress(id: string | number): Promise<void> {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }
}
