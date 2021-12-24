import { Pharmacy } from '../domain/pharmacy';
import { IPharmacyRepository } from '../domain/pharmacy-repository';
import { ApplicationErrors } from './application-errors';
import { PharmacyDTO } from './pharmacy-dto';
import { PharmacyMapper } from './pharmacy-mapper';

export interface IPharmacyService {
  create(pharmacyDto: PharmacyDTO): Promise<PharmacyDTO>;
  addAffiliatedPharmacy(
    pharmacyId: string,
    affiliatedPharmacyId: string,
  ): Promise<void>;
  update(pharmacyDto: Partial<PharmacyDTO>, id: string): Promise<PharmacyDTO>;
  delete(pharmacyId: string): Promise<void>;
  getAll(): Promise<PharmacyDTO[]>;
  getById(id: string): Promise<PharmacyDTO>;
}

export class PharmacyService implements IPharmacyService {
  constructor(private readonly pharmacyRepository: IPharmacyRepository) {}

  async create(pharmacyDto: PharmacyDTO): Promise<PharmacyDTO> {
    const pharmacy = PharmacyMapper.toDomain(pharmacyDto);
    await this.pharmacyRepository.insert(pharmacy);
    return PharmacyMapper.toDTO(pharmacy);
  }

  async addAffiliatedPharmacy(
    pharmacyId: string,
    affiliatedPharmacyId: string,
  ): Promise<void> {
    const pharmacy = await this.pharmacyRepository.getById(pharmacyId);
    if (!pharmacy) {
      throw new ApplicationErrors.NotFoundError('Pharmacy not found');
    }
    const affiliatedPharmacy = await this.pharmacyRepository.getById(
      affiliatedPharmacyId,
    );
    if (!affiliatedPharmacy) {
      throw new ApplicationErrors.NotFoundError('AffiliatedPharmacy not found');
    }
    pharmacy.addAffiliatedPharmacy(affiliatedPharmacy);
    await this.pharmacyRepository.createAffiliation(
      pharmacy,
      affiliatedPharmacy,
    );
  }

  async update(
    pharmacyDto: Partial<PharmacyDTO>,
    id: string,
  ): Promise<PharmacyDTO> {
    const pharmacy = await this.pharmacyRepository.getById(id);
    if (!pharmacy) {
      throw new ApplicationErrors.NotFoundError('Pharmacy not found');
    }
    const updatedPharmacy = new Pharmacy({
      id: pharmacy.id,
      logo: pharmacyDto.logo || pharmacy.logo,
      name: pharmacyDto.name || pharmacy.name,
      cnpj: pharmacyDto.cnpj || pharmacy.cnpj,
      address: pharmacyDto.address || pharmacy.address,
      openingHours: pharmacyDto.openingHours || pharmacy.openingHours,
      responsible: pharmacyDto.responsible || pharmacy.responsible,
      phone: pharmacyDto.phone || pharmacy.phone,
    });
    await this.pharmacyRepository.update(updatedPharmacy);
    return PharmacyMapper.toDTO(updatedPharmacy);
  }

  async delete(pharmacyId: string): Promise<void> {
    const pharmacy = await this.pharmacyRepository.getById(pharmacyId);
    if (!pharmacy) {
      throw new ApplicationErrors.NotFoundError('Pharmacy not found');
    }
    await this.pharmacyRepository.delete(pharmacy);
  }

  async getAll(): Promise<PharmacyDTO[]> {
    const pharmacies = await this.pharmacyRepository.getAll();
    return pharmacies.map(PharmacyMapper.toDTO);
  }

  async getById(id: string): Promise<PharmacyDTO> {
    const pharmacy = await this.pharmacyRepository.getById(id);
    if (!pharmacy) {
      throw new ApplicationErrors.NotFoundError('Pharmacy not found');
    }
    return PharmacyMapper.toDTO(pharmacy);
  }
}
