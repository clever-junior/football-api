import { Router } from 'express';
import { readAllMatchesController } from '../useCases/MatchUseCases/readAll';

const matchRoutes = Router();

matchRoutes.get('/', (req, res) => readAllMatchesController.handle(req, res));

export default matchRoutes;
