export class InvalidInputError extends Error {
    constructor() {
      super('Os dados de entrada são inválidos.');
    }
  }