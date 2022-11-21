import { Router } from 'express';
import { leaderBoardAwayController } from '../useCases/LeaderBoardUseCases/away';
import { leaderBoardHomeController } from '../useCases/LeaderBoardUseCases/home';

const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req, res) => leaderBoardHomeController.handle(req, res));

leaderBoardRoutes.get('/away', (req, res) => leaderBoardAwayController.handle(req, res));

export default leaderBoardRoutes;
