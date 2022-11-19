import { Router } from 'express';

import loginRoutes from './loginRoutes';
import teamRoutes from './teamRoutes';

const router = Router();

router.use('/login', loginRoutes);

router.use('/teams', teamRoutes);

export default router;
