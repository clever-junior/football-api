import Match from '../../../database/models/Match';
import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import FinishMatchController from './FinishMatchController';
import FinishMatchUseCase from './FinishMatchUseCase';

const matchRepository = new MatchRepository(
  Match,
);

const finishMatchUseCase = new FinishMatchUseCase(
  matchRepository,
);

const finishMatchController = new FinishMatchController(
  finishMatchUseCase,
);

export { finishMatchController, finishMatchUseCase };
