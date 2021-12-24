/* eslint-disable class-methods-use-this */
import { randomUUID } from 'crypto';
import { PharmacyMapper } from '../application/pharmacy-mapper';
import { Pharmacy } from '../domain/pharmacy';
import { IPharmacyRepository } from '../domain/pharmacy-repository';
import prismaClient from './prisma-client';

export class PharmacyRepository implements IPharmacyRepository {
  async insert(pharmacy: Pharmacy): Promise<void> {
    await prismaClient.pharmacy.create({
      data: PharmacyMapper.toPersistence(pharmacy),
    });
  }

  async update(pharmacy: Pharmacy): Promise<void> {
    await prismaClient.pharmacy.update({
      data: PharmacyMapper.toPersistence(pharmacy),
      where: { id: pharmacy.id },
    });
  }

  async delete(pharmacy: Pharmacy): Promise<void> {
    await prismaClient.pharmacy.delete({
      where: { id: pharmacy.id },
    });
  }

  async getAll(): Promise<Pharmacy[]> {
    const pharmacies = await prismaClient.pharmacy.findMany({
      include: {
        affiliations: {
          include: {
            affiliatePharmacy: true,
          },
        },
      },
    });
    return pharmacies.map((pharmacy) =>
      PharmacyMapper.toDomain({
        ...pharmacy,
        affiliatedPharmacies: pharmacy.affiliations?.map((affiliation) =>
          PharmacyMapper.toDomain(affiliation.affiliatePharmacy),
        ),
      }),
    );
  }

  async getById(id: string): Promise<Pharmacy | undefined> {
    const pharmacy = await prismaClient.pharmacy.findUnique({
      where: { id },
      include: {
        affiliations: {
          include: {
            affiliatePharmacy: true,
          },
        },
      },
    });
    if (!pharmacy) {
      return undefined;
    }
    return PharmacyMapper.toDomain({
      ...pharmacy,
      affiliatedPharmacies: pharmacy.affiliations?.map((affiliation) =>
        PharmacyMapper.toDomain(affiliation.affiliatePharmacy),
      ),
    });
  }

  async createAffiliation(
    pharmacy: Pharmacy,
    affiliatePharmacy: Pharmacy,
  ): Promise<void> {
    await prismaClient.affiliation.create({
      data: {
        id: randomUUID(),
        affiliateId: affiliatePharmacy.id,
        pharmacyId: pharmacy.id,
      },
    });
  }
}
