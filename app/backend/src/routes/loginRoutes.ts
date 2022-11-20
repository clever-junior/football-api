import { Router } from 'express';
import ValidateFieldsMiddleware from '../middlewares/validateFieldsMiddleware';
import LoginValidateController
  from '../useCases/UserUseCases/loginValidate/LoginValidateController';

import loginController from '../useCases/UserUseCases/login';

const loginRoutes = Router();
const validateFieldsMiddleware = new ValidateFieldsMiddleware(['email', 'password']);

loginRoutes.post(
  '/',
  (req, res, next) => validateFieldsMiddleware.execute(req, res, next),
  (req, res) => loginController.handle(req, res),
);

loginRoutes.get('/validate', (req, res) => LoginValidateController.handle(req, res));

export default loginRoutes;
