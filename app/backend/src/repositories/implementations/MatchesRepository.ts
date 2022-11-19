import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IMatchesRepository from '../IMatchesRepository';

export default class MatchRepository implements IMatchesRepository {
  constructor(
    private matchModel: typeof Match,
  ) {}

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
}
