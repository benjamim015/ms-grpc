import { PharmacyController } from '../../../infra/pharmacy-controller';
import { Http } from './http';

export class HttpRouter {
  constructor(
    private readonly http: Http,
    private readonly pharmacyController: PharmacyController,
  ) {}

  setup() {
    this.http.on('post', '/pharmacies', async (req) => {
      return this.pharmacyController.create(req);
    });

    this.http.on('patch', '/pharmacies/affiliation/:id', async (req) => {
      return this.pharmacyController.addAffiliatedPharmacy(req);
    });

    this.http.on('put', '/pharmacies/:id', async (req) => {
      return this.pharmacyController.update(req);
    });

    this.http.on('delete', '/pharmacies/:id', async (req) => {
      return this.pharmacyController.delete(req);
    });

    this.http.on('get', '/pharmacies', async () => {
      return this.pharmacyController.getAll();
    });

    this.http.on('get', '/pharmacies/:id', async (req) => {
      return this.pharmacyController.getById(req);
    });
  }
}
