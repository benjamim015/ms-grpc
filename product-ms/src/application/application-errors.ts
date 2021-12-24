/* eslint-disable max-classes-per-file */
export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ConflictError';
  }
}
