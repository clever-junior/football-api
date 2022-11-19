import User from '../../database/models/User';
import IUsersRepository from '../IUsersRepository';

export default class UserRepository implements IUsersRepository {
  constructor(
    private userModel: typeof User,
  ) {}

  async readByEmail(email: string): Promise<User | null> {
    const result = await this.userModel.findOne({ where: { email } });

    return result;
  }
}
