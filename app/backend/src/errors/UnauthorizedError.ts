export default class UnauthorizedError extends Error {
  constructor(message: string, public status = 401) {
    super(message);
  }
}
