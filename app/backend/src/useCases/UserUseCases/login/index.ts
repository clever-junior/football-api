import User from '../../../database/models/User';
import UserRepository from '../../../repositories/implementations/UsersRepository';
import LoginController from './LoginController';
import LoginUseCase from './LoginUseCase';

const userRepository = new UserRepository(
  User,
);

const loginUseCase = new LoginUseCase(
  userRepository,
);

const loginController = new LoginController(
  loginUseCase,
);

export default loginController;
