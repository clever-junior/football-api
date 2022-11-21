import { Router } from 'express';
import ValidateFieldsMiddleware from '../middlewares/validateFieldsMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import { createMatchController } from '../useCases/MatchUseCases/create';
import { readAllMatchesController } from '../useCases/MatchUseCases/readAll';
import { finishMatchController } from '../useCases/MatchUseCases/finish';
import verifyTeamsMiddleware from '../middlewares/verifyTeamsMiddleware';
import { updateMatchController } from '../useCases/MatchUseCases/update';

const matchRoutes = Router();

const validateFieldsMiddleware = new ValidateFieldsMiddleware(
  ['homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals'],
);

matchRoutes.patch(
  '/:id/finish',
  (req, res) => finishMatchController.handle(req, res),
);

matchRoutes.patch(
  '/:id',
  (req, res) => updateMatchController.handle(req, res),
);

matchRoutes.get('/', (req, res) => readAllMatchesController.handle(req, res));

matchRoutes
  .post(
    '/',
    authMiddleware,
    (req, res, next) => validateFieldsMiddleware.execute(req, res, next),
    verifyTeamsMiddleware,
    (req, res) => createMatchController.handle(req, res),
  );

export default matchRoutes;
