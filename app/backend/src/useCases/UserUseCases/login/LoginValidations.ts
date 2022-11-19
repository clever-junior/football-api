import { compareSync } from 'bcryptjs';
import Error from '../../../errors';
import User from '../../../database/models/User';
import ILoginDTO from './LoginDTO';

type RequiredFields = ['email', 'password'];

export default class LoginValidation {
  private requiredFields: RequiredFields;

  constructor() {
    this.requiredFields = ['email', 'password'];
  }

  missingParams(data: ILoginDTO) {
    this.requiredFields.forEach((key) => {
      if (!data[key]) { Error.badRequest('All fields must be filled'); }
    });
  }

  static invalidParams(user: User, data: ILoginDTO) {
    if (!user) {
      Error.unauthorized('Incorrect email or password');
    }

    const result = compareSync(data.password, user.password);

    if (!result) {
      Error.unauthorized('Incorrect email or password');
    }
  }
}
