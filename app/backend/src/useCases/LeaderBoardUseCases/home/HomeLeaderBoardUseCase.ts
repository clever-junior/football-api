import IMatchesRepository from '../../../repositories/IMatchesRepository';
import ITeamsRepository from '../../../repositories/ITeamsRepository';
import { generateHomeLeaderboard } from './HomeLeaderBoardValidations';

export default class HomeLeaderBoardUseCase {
  constructor(
    private matchRepository: IMatchesRepository,
    private teamRepository: ITeamsRepository,
  ) {}

  async execute() {
    const teams = await this.teamRepository.readAll();
    const matches = await this.matchRepository.readByInProgress(false);

    const leaderBoard = generateHomeLeaderboard(matches, teams);

    return leaderBoard;
  }
}
