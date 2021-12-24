export interface IGRPCService {
  getPharmacyById(id: string): Promise<any | Error>;
}
