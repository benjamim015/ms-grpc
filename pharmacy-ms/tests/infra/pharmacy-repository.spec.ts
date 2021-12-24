import faker from 'faker';
import { prismaMock } from '../../singleton';
import { PharmacyMapper } from '../../src/application/pharmacy-mapper';
import { Pharmacy } from '../../src/domain/pharmacy';
import { PharmacyRepository } from '../../src/infra/pharmacy-repository';

const pharmacyData = {
  logo: faker.image.imageUrl(),
  name: faker.company.companyName(),
  cnpj: '47.934.918/0001-71',
  address: faker.address.streetAddress(),
  openingHours: '08:00 - 18:00',
  responsible: faker.name.findName(),
  phone: '5511912344321',
};

describe('pharmacyRepository', () => {
  let sut: PharmacyRepository;

  beforeEach(() => {
    sut = new PharmacyRepository();
  });

  it('insert', async () => {
    const pharmacy = new Pharmacy(pharmacyData);
    prismaMock.pharmacy.create.mockResolvedValue(
      PharmacyMapper.toDTO(pharmacy),
    );
    await sut.insert(pharmacy);
    expect(prismaMock.pharmacy.create).toHaveBeenCalledWith({
      data: PharmacyMapper.toPersistence(pharmacy),
    });
  });

  it('update', async () => {
    const pharmacy = new Pharmacy(pharmacyData);
    prismaMock.pharmacy.update.mockResolvedValue(
      PharmacyMapper.toDTO(pharmacy),
    );
    await sut.update(pharmacy);
    expect(prismaMock.pharmacy.update).toHaveBeenCalledWith({
      data: PharmacyMapper.toPersistence(pharmacy),
      where: { id: pharmacy.id },
    });
  });

  it('delete', async () => {
    const pharmacy = new Pharmacy(pharmacyData);
    prismaMock.pharmacy.delete.mockResolvedValue(
      PharmacyMapper.toDTO(pharmacy),
    );
    await sut.delete(pharmacy);
    expect(prismaMock.pharmacy.delete).toHaveBeenCalledWith({
      where: { id: pharmacy.id },
    });
  });

  it('getAll', async () => {
    const pharmacy = new Pharmacy(pharmacyData);
    prismaMock.pharmacy.findMany.mockResolvedValue([
      PharmacyMapper.toDTO(pharmacy),
    ]);
    const pharmacies = await sut.getAll();
    expect(pharmacies).toHaveLength(1);
    expect(pharmacies[0]).toEqual(pharmacy);
  });

  it('getById', async () => {
    const pharmacy = new Pharmacy(pharmacyData);
    prismaMock.pharmacy.findUnique.mockResolvedValue(
      PharmacyMapper.toDTO(pharmacy),
    );
    const pharmacyFound = await sut.getById(pharmacy.id);
    expect(pharmacyFound).toEqual(pharmacy);
  });

  it('createAffiliation', async () => {
    const pharmacy = new Pharmacy(pharmacyData);
    const affiliatePharmacy = new Pharmacy(pharmacyData);
    prismaMock.affiliation.create.mockResolvedValue(
      PharmacyMapper.toDTO(pharmacy),
    );
    await sut.createAffiliation(pharmacy, affiliatePharmacy);
    expect(prismaMock.affiliation.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          affiliateId: affiliatePharmacy.id,
          pharmacyId: pharmacy.id,
        }),
      }),
    );
  });
});
