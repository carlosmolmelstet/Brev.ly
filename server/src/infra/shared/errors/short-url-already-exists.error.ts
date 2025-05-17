export class ShortUrlAlreadyExistsError extends Error {
    constructor() {
      super('Essa URL encurtada já existe.');
    }
  }