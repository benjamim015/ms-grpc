/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { DomainError } from './domain-error';

export class Validations {
  public static isNotEmpty(value: string, message: string): void {
    if (!value || value.trim().length === 0) {
      throw new DomainError(message);
    }
  }

  public static isNotNull(value: any, message: string): void {
    if (!value) {
      throw new DomainError(message);
    }
  }

  public static isGreaterThan(
    value: number,
    min: number,
    message: string,
  ): void {
    if (!value || value <= min) {
      throw new DomainError(message);
    }
  }
}
