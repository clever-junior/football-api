import Match from '../../../database/models/Match';
import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import ReadAllMatchesController from './ReadAllMatchesController';
import ReadAllMatchesUseCase from './ReadAllMatchesUseCase';

const matchesRepository = new MatchRepository(
  Match,
);

const readAllMatchesUseCase = new ReadAllMatchesUseCase(
  matchesRepository,
);

const readAllMatchesController = new ReadAllMatchesController(
  readAllMatchesUseCase,
);

export { readAllMatchesController, readAllMatchesUseCase };
