import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import TeamRepository from '../../../repositories/implementations/TeamsRepository';
import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';
import AwayLeaderBoardController from './AwayLeaderBoardController';
import AwayLeaderBoardUseCase from './AwayLeaderBoardUseCase';

const teamRepository = new TeamRepository(
  Team,
);

const matchRepository = new MatchRepository(
  Match,
);

const leaderBoardAwayUseCase = new AwayLeaderBoardUseCase(
  matchRepository,
  teamRepository,
);

const leaderBoardAwayController = new AwayLeaderBoardController(
  leaderBoardAwayUseCase,
);

export { leaderBoardAwayController, leaderBoardAwayUseCase };
