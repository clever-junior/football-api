export default class UnprocessableEntityError extends Error {
  constructor(message: string, public status = 422) {
    super(message);
  }
}
