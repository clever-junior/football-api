import { Router } from 'express';
import { readOneTeamController } from '../useCases/TeamUseCases/readOne';
import { readAllTeamsController } from '../useCases/TeamUseCases/readAll';

const teamRoutes = Router();

teamRoutes.get('/:id', (req, res) => readOneTeamController.handle(req, res));

teamRoutes.get('/', (req, res) => readAllTeamsController.handle(req, res));

export default teamRoutes;
