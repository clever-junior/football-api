import { Router } from 'express';
import loginController from '../useCases/UserUseCases/login';

const loginRoutes = Router();

loginRoutes.post('/', (req, res) => loginController.handle(req, res));

// login.get('/validate', (req, res) => {});

export default loginRoutes;
