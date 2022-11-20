import { sign, Secret, verify, JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';
import User from '../database/models/User';

export default class Token {
  static generate(user: User): string {
    const secret = process.env.JWT_SECRET as Secret;
    const token = sign({ data: user }, secret);

    return token;
  }

  static validate(token: string) {
    const secret = process.env.JWT_SECRET as Secret;

    let payload: JwtPayload | undefined;

    verify(token, secret, (err, decoded) => {
      if (err) { throw new UnauthorizedError('Invalid token'); }

      payload = decoded;
    });

    return payload;
  }
}
