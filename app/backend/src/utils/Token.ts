import { sign, Secret, verify, JwtPayload } from 'jsonwebtoken';
import User from '../database/models/User';

export default class Token {
  static generate(user: User): string {
    const secret = process.env.JWT_SECRET as Secret;
    const token = sign({ data: user }, secret);

    return token;
  }

  static validate(token: string) {
    const secret = process.env.JWT_SECRET as Secret;
    const payload = verify(token, secret);

    return payload as JwtPayload;
  }
}
