export type ProductDTO = {
  id?: string;
  thumbnail: string;
  name: string;
  price: number;
  ingredients: string;
  availability: number;
  volume: number;
  pharmacyId: string;
};

export type PharmacyDTO = {
  id: string;
  logo: string;
  name: string;
  cnpj: string;
  address: string;
  openingHours: string;
  responsible: string;
  phone: string;
};
