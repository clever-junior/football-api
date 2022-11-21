import IMatchesRepository from '../../../repositories/IMatchesRepository';
import ITeamsRepository from '../../../repositories/ITeamsRepository';
import generateLeaderboard from '../home/HomeLeaderBoardValidations';

export default class ReadLeaderBoardUseCase {
  constructor(
    private matchRepository: IMatchesRepository,
    private teamRepository: ITeamsRepository,
  ) {}

  async execute() {
    const teams = await this.teamRepository.readAll();
    const matches = await this.matchRepository.readByInProgress(false);

    const leaderBoard = generateLeaderboard(matches, teams);

    return leaderBoard;
  }
}
