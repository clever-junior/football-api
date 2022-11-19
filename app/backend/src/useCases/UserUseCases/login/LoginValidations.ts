import { compareSync } from 'bcryptjs';
import Error from '../../../errors';
import User from '../../../database/models/User';
import ILoginDTO from './LoginDTO';

type RequiredFields = ['email', 'password'];

export default class LoginValidation {
  private requiredFields: RequiredFields;
  private error: Error;

  constructor() {
    this.requiredFields = ['email', 'password'];
    this.error = new Error();
  }

  missingParams(data: ILoginDTO) {
    this.requiredFields.forEach((key) => {
      if (!data[key]) { this.error.badRequest('All fields must be filled'); }
    });
  }

  invalidParams(user: User, data: ILoginDTO) {
    if (!user) {
      this.error.unauthorized('Incorrect email or password');
    }

    const result = compareSync(data.password, user.password);

    if (!result) {
      this.error.unauthorized('Incorrect email or password');
    }
  }
}
