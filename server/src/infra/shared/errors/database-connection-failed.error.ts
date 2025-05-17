export class DatabaseConnectionFailedError extends Error {
    constructor() {
      super('Conexão com o banco de dados falhou.');
    }
  }