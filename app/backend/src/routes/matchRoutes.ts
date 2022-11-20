import { Router } from 'express';
import ValidateFieldsMiddleware from '../middlewares/validateFieldsMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import { createMatchController } from '../useCases/MatchUseCases/create';
import { readAllMatchesController } from '../useCases/MatchUseCases/readAll';

const matchRoutes = Router();

const validateFieldsMiddleware = new ValidateFieldsMiddleware(
  ['homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals'],
);

matchRoutes.get('/', (req, res) => readAllMatchesController.handle(req, res));

matchRoutes
  .post(
    '/',
    authMiddleware,
    (req, res, next) => validateFieldsMiddleware.execute(req, res, next),
    (req, res) => createMatchController.handle(req, res),
  );

export default matchRoutes;
