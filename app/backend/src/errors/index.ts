import BadRequestError from './BadRequestError';
import NotFoundError from './NotFoundError';
import UnauthorizedError from './UnauthorizedError';
import UnprocessableEntityError from './UnprocessableEntityError';

export default class Error {
  static badRequest(message: string) {
    throw new BadRequestError(message);
  }

  static unauthorized(message: string) {
    throw new UnauthorizedError(message);
  }

  static notFound(message: string) {
    throw new NotFoundError(message);
  }

  static unprocessableEntity(message: string) {
    throw new UnprocessableEntityError(message);
  }
}
