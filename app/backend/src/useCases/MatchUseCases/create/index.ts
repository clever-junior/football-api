import TeamRepository from '../../../repositories/implementations/TeamsRepository';
import Match from '../../../database/models/Match';
import MatchRepository from '../../../repositories/implementations/MatchesRepository';
import CreateMatchController from './CreateMatchController';
import CreateMatchUseCase from './CreateMatchUseCases';
import Team from '../../../database/models/Team';

const matchRepository = new MatchRepository(
  Match,
);

const teamRepository = new TeamRepository(
  Team,
);

const createMatchUseCase = new CreateMatchUseCase(
  matchRepository,
);

const createMatchController = new CreateMatchController(
  createMatchUseCase,
  teamRepository,
);

export { createMatchController, createMatchUseCase };
