import { Router } from 'express';

import loginRoutes from './loginRoutes';
import matchRoutes from './matchRoutes';
import teamRoutes from './teamRoutes';

const router = Router();

router.use('/login', loginRoutes);

router.use('/teams', teamRoutes);

router.use('/matches', matchRoutes);

export default router;
