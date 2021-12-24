import faker from 'faker';
import { Pharmacy } from '../../src/domain/pharmacy';
import { DomainError } from '../../src/shared/domain-error';

const pharmacyData = {
  logo: faker.image.imageUrl(),
  name: faker.company.companyName(),
  cnpj: '47.934.918/0001-71',
  address: faker.address.streetAddress(),
  openingHours: '08:00 - 18:00',
  responsible: faker.name.findName(),
  phone: '5511912344321',
};

describe('Pharmacy', () => {
  it('should not be able to create a pharmacy without name', () => {
    expect(() => new Pharmacy({ ...pharmacyData, name: '' })).toThrow(
      DomainError,
    );
  });

  it('should not be able to create a pharmacy with invalid cnpj', () => {
    expect(() => new Pharmacy({ ...pharmacyData, cnpj: '123' })).toThrow(
      DomainError,
    );
  });

  it('should not be able to create a pharmacy without address', () => {
    expect(() => new Pharmacy({ ...pharmacyData, address: '' })).toThrow(
      DomainError,
    );
  });

  it('should not be able to create a pharmacy without opening hours', () => {
    expect(() => new Pharmacy({ ...pharmacyData, openingHours: '' })).toThrow(
      DomainError,
    );
  });

  it('should not be able to create a pharmacy without responsible', () => {
    expect(() => new Pharmacy({ ...pharmacyData, responsible: '' })).toThrow(
      DomainError,
    );
  });

  it('should not be able to create a pharmacy with invalid phone', () => {
    expect(() => new Pharmacy({ ...pharmacyData, phone: '123' })).toThrow(
      DomainError,
    );
  });

  it('should be able to get all pharmacy data', () => {
    const pharmacy = new Pharmacy(pharmacyData);
    expect(pharmacy.id).toBeTruthy();
    expect(pharmacy.logo).toBe(pharmacyData.logo);
    expect(pharmacy.name).toBe(pharmacyData.name);
    expect(pharmacy.cnpj).toBe(pharmacyData.cnpj);
    expect(pharmacy.address).toBe(pharmacyData.address);
    expect(pharmacy.openingHours).toBe(pharmacyData.openingHours);
    expect(pharmacy.responsible).toBe(pharmacyData.responsible);
    expect(pharmacy.phone).toBe(pharmacyData.phone);
    expect(pharmacy.affiliatedPharmacies).toEqual([]);
  });

  it('should be able to affiliate a pharmacy', () => {
    const pharmacy = new Pharmacy(pharmacyData);
    const affiliate = new Pharmacy(pharmacyData);
    pharmacy.addAffiliatedPharmacy(affiliate);
    expect(pharmacy.affiliatedPharmacies).toEqual([affiliate]);
  });

  it('should not be able to affiliate same pharmacy twice', () => {
    const pharmacy = new Pharmacy(pharmacyData);
    const affiliate = new Pharmacy(pharmacyData);
    pharmacy.addAffiliatedPharmacy(affiliate);
    expect(() => pharmacy.addAffiliatedPharmacy(affiliate)).toThrow(
      DomainError,
    );
  });

  it('should not be able to affiliate more than 3 pharmacies', () => {
    const pharmacy = new Pharmacy(pharmacyData);
    const affiliate = new Pharmacy(pharmacyData);
    const affiliate2 = new Pharmacy(pharmacyData);
    const affiliate3 = new Pharmacy(pharmacyData);
    const affiliate4 = new Pharmacy(pharmacyData);
    pharmacy.addAffiliatedPharmacy(affiliate);
    pharmacy.addAffiliatedPharmacy(affiliate2);
    pharmacy.addAffiliatedPharmacy(affiliate3);
    expect(() => pharmacy.addAffiliatedPharmacy(affiliate4)).toThrow(
      DomainError,
    );
  });

  it('should not be able to affiliate a pharmacy with itself', () => {
    const pharmacy = new Pharmacy(pharmacyData);
    expect(() => pharmacy.addAffiliatedPharmacy(pharmacy)).toThrow(DomainError);
  });

  it('should return if a pharmacy is head', () => {
    const pharmacy = new Pharmacy(pharmacyData);
    expect(pharmacy.isHeadPharmacy()).toBe(false);
    const affiliate = new Pharmacy(pharmacyData);
    pharmacy.addAffiliatedPharmacy(affiliate);
    expect(pharmacy.isHeadPharmacy()).toBe(true);
  });
});
