import { Router } from 'express';
import leaderBoardRoutes from './leaderBoardRoutes';

import loginRoutes from './loginRoutes';
import matchRoutes from './matchRoutes';
import teamRoutes from './teamRoutes';

const router = Router();

router.use('/login', loginRoutes);

router.use('/teams', teamRoutes);

router.use('/matches', matchRoutes);

router.use('/leaderboard', leaderBoardRoutes);

export default router;
