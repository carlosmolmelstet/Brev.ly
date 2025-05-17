export class DeleteFailedError extends Error {
    constructor() {
      super('Houve um erro ao deletar o link.');
    }
  }