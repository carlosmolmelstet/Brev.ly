export class UpdateFailedError extends Error {
    constructor() {
      super('Houve um erro ao incrementar o acesso ao link.');
    }
  }