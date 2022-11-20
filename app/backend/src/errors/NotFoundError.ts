export default class NotFoundError extends Error {
  constructor(message: string, public status = 404) {
    super(message);
  }
}
