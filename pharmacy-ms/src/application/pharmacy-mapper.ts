import { Pharmacy } from '../domain/pharmacy';
import { PharmacyDTO } from './pharmacy-dto';

export class PharmacyMapper {
  static toDomain(pharmacyDto: PharmacyDTO): Pharmacy {
    return new Pharmacy({
      id: pharmacyDto.id,
      logo: pharmacyDto.logo,
      name: pharmacyDto.name,
      cnpj: pharmacyDto.cnpj,
      address: pharmacyDto.address,
      openingHours: pharmacyDto.openingHours,
      responsible: pharmacyDto.responsible,
      phone: pharmacyDto.phone,
      affiliatedPharmacies: pharmacyDto.affiliatedPharmacies?.map((affiliate) =>
        this.toDomain(affiliate),
      ),
    });
  }

  static toDTO(pharmacy: Pharmacy): any {
    return {
      id: pharmacy.id,
      logo: pharmacy.logo,
      name: pharmacy.name,
      cnpj: pharmacy.cnpj,
      address: pharmacy.address,
      openingHours: pharmacy.openingHours,
      responsible: pharmacy.responsible,
      phone: pharmacy.phone,
      affiliatedPharmacies: pharmacy.affiliatedPharmacies.map(
        (affiliatedPharmacy) => PharmacyMapper.toDTO(affiliatedPharmacy),
      ),
    };
  }

  static toPersistence(pharmacy: Pharmacy) {
    return {
      id: pharmacy.id,
      logo: pharmacy.logo,
      name: pharmacy.name,
      cnpj: pharmacy.cnpj,
      address: pharmacy.address,
      openingHours: pharmacy.openingHours,
      responsible: pharmacy.responsible,
      phone: pharmacy.phone,
    };
  }
}
