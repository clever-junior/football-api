import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/BadRequestError';

export default class ValidateFieldsMiddleware {
  constructor(
    private requiredFields: Array<string>,
  ) {}

  execute(req: Request, _res: Response, next: NextFunction) {
    const data = req.body;

    this.requiredFields.forEach((field) => {
      if (!data[field]) { throw new BadRequestError('All fields must be filled'); }
    });

    next();
  }
}
