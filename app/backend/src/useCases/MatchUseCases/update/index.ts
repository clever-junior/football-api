// import TeamRepository from '../../../repositories/implementations/TeamsRepository';
import Match from '../../../database/models/Match';
import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import UpdateMatchController from './UpdateMatchController';
import UpdateMatchUseCase from './UpdateMatchUseCase';
// import Team from '../../../database/models/Team';

const matchRepository = new MatchRepository(
  Match,
);

// const teamRepository = new TeamRepository(
//   Team,
// );

const updateMatchUseCase = new UpdateMatchUseCase(
  matchRepository,
);

const updateMatchController = new UpdateMatchController(
  updateMatchUseCase,
);

export { updateMatchController, updateMatchUseCase };
