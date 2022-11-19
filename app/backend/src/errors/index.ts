import BadRequestError from './BadRequestError';
import UnauthorizedError from './UnauthorizedError';

export default class Error {
  private message: string;

  badRequest(message: string) {
    this.message = message;
    throw new BadRequestError(this.message);
  }

  unauthorized(message: string) {
    this.message = message;
    throw new UnauthorizedError(this.message);
  }
}
