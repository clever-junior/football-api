import User from '../database/models/User';

export default interface IUsersRepository {
  readByEmail(email: string): Promise<User | null>;
}
