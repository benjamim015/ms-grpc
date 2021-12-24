/* eslint-disable @typescript-eslint/no-namespace */
export namespace ApplicationErrors {
  export class NotFoundError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'NotFoundError';
    }
  }
}
