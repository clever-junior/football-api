import BadRequestError from './BadRequestError';
import UnauthorizedError from './UnauthorizedError';

export default class Error {
  static badRequest(message: string) {
    throw new BadRequestError(message);
  }

  static unauthorized(message: string) {
    throw new UnauthorizedError(message);
  }
}
