/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import validator from 'validator';
import { DomainError } from './domain-error';

export class Validations {
  public static isNotEmpty(value: string, message: string): void {
    if (!value || value.trim().length === 0) {
      throw new DomainError(message);
    }
  }

  public static isPhone(value: string, message: string): void {
    if (validator.isMobilePhone(value) === false) {
      throw new DomainError(message);
    }
  }

  public static isCnpj(rawCnpj: string, message: string): void {
    const blacklist = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999',
    ];
    function checkDigits(cnpj: Array<string>) {
      const reverse = cnpj.reverse();
      let index = 2;
      let sum = 0;
      reverse.forEach((number) => {
        sum += Number(number) * index;
        if (index === 9) index = 1;
        index += 1;
      });
      return sum % 11 < 2 ? 0 : 11 - (sum % 11);
    }
    const cleanCnpj = rawCnpj.replace(/[^\d]+/g, '');
    const cnpjRegex = /^\d{14}$/;
    if (!cnpjRegex.test(cleanCnpj) || blacklist.includes(cleanCnpj)) {
      throw new DomainError(message);
    }
    let cnpjNumbers = cleanCnpj.substring(0, 12);
    const cnpjWithoutCheckDigits = cleanCnpj.substring(0, 12).split('');
    cnpjNumbers += checkDigits(cnpjWithoutCheckDigits);
    cnpjNumbers += checkDigits(cnpjNumbers.split(''));
    if (cnpjNumbers !== cleanCnpj) {
      throw new DomainError(message);
    }
  }
}
