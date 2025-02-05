export class InvalidCredentialError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
