import { Pharmacy } from './pharmacy';

export interface IPharmacyRepository {
  insert(pharmacy: Pharmacy): Promise<void>;
  update(pharmacy: Pharmacy): Promise<void>;
  delete(pharmacy: Pharmacy): Promise<void>;
  getAll(): Promise<Pharmacy[]>;
  getById(id: string): Promise<Pharmacy | undefined>;
  createAffiliation(
    pharmacy: Pharmacy,
    affiliatePharmacy: Pharmacy,
  ): Promise<void>;
}
