import { Router } from 'express';

import LoginValidateController
  from '../useCases/UserUseCases/loginValidate/LoginValidateController';

import loginController from '../useCases/UserUseCases/login';

const loginRoutes = Router();

loginRoutes.post('/', (req, res) => loginController.handle(req, res));

loginRoutes.get('/validate', (req, res) => LoginValidateController.handle(req, res));

export default loginRoutes;
