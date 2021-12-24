import faker from 'faker';
import { PharmacyService } from '../../src/application/pharmacy-service';
import { Pharmacy } from '../../src/domain/pharmacy';
import { PharmacyRepositoryMemory } from '../infra/pharmacy-repository-memory';

const pharmacyData = {
  logo: faker.image.imageUrl(),
  name: faker.company.companyName(),
  cnpj: '47.934.918/0001-71',
  address: faker.address.streetAddress(),
  openingHours: '08:00 - 18:00',
  responsible: faker.name.findName(),
  phone: '5511912344321',
};

describe('PharmacyService', () => {
  let sut: PharmacyService;
  let pharmacyRepository: PharmacyRepositoryMemory;

  beforeEach(() => {
    pharmacyRepository = new PharmacyRepositoryMemory();
    sut = new PharmacyService(pharmacyRepository);
  });

  describe('create()', () => {
    it('should create a pharmacy', async () => {
      const pharmacy = await sut.create(pharmacyData);
      expect(pharmacy.id).toBeTruthy();
    });

    it('should call pharmacyRepository.insert', async () => {
      const spy = jest.spyOn(pharmacyRepository, 'insert');
      await sut.create(pharmacyData);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('addAffiliatedPharmacy()', () => {
    it('should add an affiliate', async () => {
      const pharmacy = new Pharmacy(pharmacyData);
      const affiliate = new Pharmacy(pharmacyData);
      await pharmacyRepository.insert(pharmacy);
      await pharmacyRepository.insert(affiliate);
      await sut.addAffiliatedPharmacy(pharmacy.id, affiliate.id);
      expect(pharmacy.affiliatedPharmacies.length).toBe(1);
    });

    it('should throw if not find a pharmacy', async () => {
      const affiliate = new Pharmacy(pharmacyData);
      await pharmacyRepository.insert(affiliate);
      await expect(
        sut.addAffiliatedPharmacy('not-found', affiliate.id),
      ).rejects.toThrow();
    });

    it('should throw if not find a affiliate', async () => {
      const pharmacy = new Pharmacy(pharmacyData);
      await pharmacyRepository.insert(pharmacy);
      await expect(
        sut.addAffiliatedPharmacy(pharmacy.id, 'not-found'),
      ).rejects.toThrow();
    });
  });

  describe('update()', () => {
    it('should update a pharmacy', async () => {
      const pharmacy = new Pharmacy(pharmacyData);
      await pharmacyRepository.insert(pharmacy);
      const updatedPharmacy = await sut.update(
        { name: 'updated-name' },
        pharmacy.id,
      );
      expect(updatedPharmacy.id).toBe(pharmacy.id);
      expect(updatedPharmacy.name).toBe('updated-name');
      expect(updatedPharmacy.phone).toBe(pharmacy.phone);
    });

    it('should throw if not find a pharmacy', async () => {
      await expect(
        sut.update({ name: 'updated-name' }, 'not-found'),
      ).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    it('should delete a pharmacy', async () => {
      const pharmacy = new Pharmacy(pharmacyData);
      await pharmacyRepository.insert(pharmacy);
      await sut.delete(pharmacy.id);
      const pharmacies = await pharmacyRepository.getAll();
      expect(pharmacies).toHaveLength(0);
    });

    it('should throw if not find a pharmacy', async () => {
      await expect(sut.delete('not-found')).rejects.toThrow();
    });
  });

  describe('getAll()', () => {
    it('should get all pharmacies', async () => {
      const pharmacy = new Pharmacy(pharmacyData);
      await pharmacyRepository.insert(pharmacy);
      const pharmacies = await sut.getAll();
      expect(pharmacies).toHaveLength(1);
    });
  });

  describe('getById()', () => {
    it('should get a pharmacy', async () => {
      const pharmacy = new Pharmacy(pharmacyData);
      await pharmacyRepository.insert(pharmacy);
      const pharmacyFound = await sut.getById(pharmacy.id);
      expect(pharmacyFound).toBeTruthy();
    });

    it('should throw if not find a pharmacy', async () => {
      await expect(sut.getById('not-found')).rejects.toThrow();
    });
  });
});
