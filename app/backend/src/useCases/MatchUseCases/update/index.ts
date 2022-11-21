import Match from '../../../database/models/Match';
import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import UpdateMatchController from './UpdateMatchController';
import UpdateMatchUseCase from './UpdateMatchUseCase';

const matchRepository = new MatchRepository(
  Match,
);

const updateMatchUseCase = new UpdateMatchUseCase(
  matchRepository,
);

const updateMatchController = new UpdateMatchController(
  updateMatchUseCase,
);

export { updateMatchController, updateMatchUseCase };
