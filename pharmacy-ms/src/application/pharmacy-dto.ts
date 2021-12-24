export type PharmacyDTO = {
  id?: string;
  logo: string;
  name: string;
  cnpj: string;
  address: string;
  openingHours: string;
  responsible: string;
  phone: string;
  affiliatedPharmacies?: PharmacyDTO[];
};
