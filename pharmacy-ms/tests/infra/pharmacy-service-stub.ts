/* eslint-disable class-methods-use-this */
import faker from 'faker';
import { PharmacyDTO } from '../../src/application/pharmacy-dto';
import { PharmacyMapper } from '../../src/application/pharmacy-mapper';
import { IPharmacyService } from '../../src/application/pharmacy-service';
import { Pharmacy } from '../../src/domain/pharmacy';

const pharmacyData = {
  logo: faker.image.imageUrl(),
  name: faker.company.companyName(),
  cnpj: '47.934.918/0001-71',
  address: faker.address.streetAddress(),
  openingHours: '08:00 - 18:00',
  responsible: faker.name.findName(),
  phone: '5511912344321',
};

export class PharmacyServiceStub implements IPharmacyService {
  async create(_: PharmacyDTO): Promise<PharmacyDTO> {
    return PharmacyMapper.toDTO(new Pharmacy(pharmacyData));
  }

  async addAffiliatedPharmacy(_: string, __: string): Promise<void> {
    return undefined;
  }

  async update(_: Partial<PharmacyDTO>, __: string): Promise<PharmacyDTO> {
    return PharmacyMapper.toDTO(new Pharmacy(pharmacyData));
  }

  async delete(_: string): Promise<void> {
    return undefined;
  }

  async getAll(): Promise<PharmacyDTO[]> {
    return [];
  }

  async getById(_: string): Promise<PharmacyDTO> {
    return PharmacyMapper.toDTO(new Pharmacy(pharmacyData));
  }
}
