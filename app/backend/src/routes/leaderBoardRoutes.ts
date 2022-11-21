import { Router } from 'express';
import { leaderBoardHomeController } from '../useCases/LeaderBoardUseCases/home';

const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req, res) => leaderBoardHomeController.handle(req, res));

export default leaderBoardRoutes;
