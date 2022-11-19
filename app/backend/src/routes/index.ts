import { Router } from 'express';

import loginRoutes from './loginRoutes';

const router = Router();

router.use('/login', loginRoutes);

export default router;
