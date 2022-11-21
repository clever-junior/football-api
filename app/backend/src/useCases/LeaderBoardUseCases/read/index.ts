import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import TeamRepository from '../../../repositories/implementations/TeamsRepository';
import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';
import ReadLeaderBoardController from './ReadLeaderBoardController';
import ReadLeaderBoardUseCase from './ReadLeaderBoardUseCase';

const teamRepository = new TeamRepository(
  Team,
);

const matchRepository = new MatchRepository(
  Match,
);

const leaderBoardReadUseCase = new ReadLeaderBoardUseCase(
  matchRepository,
  teamRepository,
);

const leaderBoardReadController = new ReadLeaderBoardController(
  leaderBoardReadUseCase,
);

export { leaderBoardReadController, leaderBoardReadUseCase };
