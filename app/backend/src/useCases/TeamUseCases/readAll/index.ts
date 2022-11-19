import Team from '../../../database/models/Team';
import TeamRepository from '../../../repositories/implementations/TeamsRepository';
import ReadAllTeamsController from './ReadAllTeamsController';
import ReadAllTeamsUseCase from './ReadAllTeamsUseCase';

const teamsRepository = new TeamRepository(
  Team,
);

const readAllTeamsUseCase = new ReadAllTeamsUseCase(
  teamsRepository,
);

const readAllTeamsController = new ReadAllTeamsController(
  readAllTeamsUseCase,
);

export { readAllTeamsController, readAllTeamsUseCase };
