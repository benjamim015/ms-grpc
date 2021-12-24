import { Pharmacy } from '../../src/domain/pharmacy';
import { IPharmacyRepository } from '../../src/domain/pharmacy-repository';

export class PharmacyRepositoryMemory implements IPharmacyRepository {
  pharmacies: Pharmacy[] = [];

  async insert(pharmacy: Pharmacy): Promise<void> {
    this.pharmacies.push(pharmacy);
  }

  async update(pharmacy: Pharmacy): Promise<void> {
    this.pharmacies = this.pharmacies.map((p) => {
      if (p.id === pharmacy.id) {
        return pharmacy;
      }
      return p;
    });
  }

  async delete(pharmacy: Pharmacy): Promise<void> {
    this.pharmacies = this.pharmacies.filter((p) => p.id !== pharmacy.id);
  }

  async getAll(): Promise<Pharmacy[]> {
    return this.pharmacies;
  }

  async getById(id: string): Promise<Pharmacy | undefined> {
    return this.pharmacies.find((p) => p.id === id);
  }

  async createAffiliation(pharmacy: Pharmacy, _: Pharmacy): Promise<void> {
    this.update(pharmacy);
  }
}
