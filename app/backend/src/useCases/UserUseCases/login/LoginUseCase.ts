import Token from '../../../utils/Token';
import User from '../../../database/models/User';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ILoginDTO from './LoginDTO';
import LoginValidation from './LoginValidations';

export default class LoginUseCase {
  private loginValidation: LoginValidation;

  constructor(
    private usersRepository: IUsersRepository,
  ) {
    this.loginValidation = new LoginValidation();
  }

  async execute(data: ILoginDTO): Promise<string | null> {
    this.loginValidation.missingParams(data);

    const user = await this.usersRepository.readByEmail(data.email);

    LoginValidation.invalidParams(user as User, data);

    if (user) {
      const token = Token.generate(user);
      return token;
    }

    return null;
  }
}
