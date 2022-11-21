import { Router } from 'express';
import { leaderBoardReadController } from '../useCases/LeaderBoardUseCases/read';
import { leaderBoardAwayController } from '../useCases/LeaderBoardUseCases/away';
import { leaderBoardHomeController } from '../useCases/LeaderBoardUseCases/home';

const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req, res) => leaderBoardHomeController.handle(req, res));

leaderBoardRoutes.get('/away', (req, res) => leaderBoardAwayController.handle(req, res));

leaderBoardRoutes.get('/', (req, res) => leaderBoardReadController.handle(req, res));

export default leaderBoardRoutes;
