export default class BadRequestError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}
