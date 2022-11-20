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
  teamRepository,
);

const createMatchController = new CreateMatchController(
  createMatchUseCase,
);

export { createMatchController, createMatchUseCase };
