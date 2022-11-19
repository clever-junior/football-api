import Team from '../../../database/models/Team';
import TeamRepository from '../../../repositories/implementations/TeamsRepository';
import ReadOneTeamController from './ReadOneTeamController';
import ReadOneTeamUseCase from './ReadOneTeamUseCase';

const teamsRepository = new TeamRepository(
  Team,
);

const readOneTeamUseCase = new ReadOneTeamUseCase(
  teamsRepository,
);

const readOneTeamController = new ReadOneTeamController(
  readOneTeamUseCase,
);

export { readOneTeamController, readOneTeamUseCase };
