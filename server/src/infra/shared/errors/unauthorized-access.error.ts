export class UnauthorizedAccessError extends Error {
    constructor() {
      super('Acesso não autorizado.');
    }
  }