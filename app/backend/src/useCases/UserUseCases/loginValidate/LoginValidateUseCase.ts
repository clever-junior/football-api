import User from '../../../database/models/User';
import Token from '../../../utils/Token';

export default class LoginValidateUseCase {
  static execute(token: string): User | null {
    const result = Token.validate(token);

    if (result) {
      const { data } = result;
      return data;
    }

    return null;
  }
}
