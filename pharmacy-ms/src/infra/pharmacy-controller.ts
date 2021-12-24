import { IPharmacyService } from '../application/pharmacy-service';
import { HttpRequest, HttpResponse } from '../shared/infra/http/http';

export class PharmacyController {
  constructor(private readonly pharmacyService: IPharmacyService) {}

  async create({ body }: HttpRequest): Promise<HttpResponse> {
    const response = await this.pharmacyService.create(body);
    return {
      statusCode: 201,
      data: response,
    };
  }

  async addAffiliatedPharmacy({
    params,
    body,
  }: HttpRequest): Promise<HttpResponse> {
    await this.pharmacyService.addAffiliatedPharmacy(
      params.id,
      body.affiliatedPharmacyId,
    );
    return {
      statusCode: 204,
      data: null,
    };
  }

  async update({ params, body }: HttpRequest): Promise<HttpResponse> {
    const response = await this.pharmacyService.update(body, params.id);
    return {
      statusCode: 200,
      data: response,
    };
  }

  async delete({ params }: HttpRequest): Promise<HttpResponse> {
    await this.pharmacyService.delete(params.id);
    return {
      statusCode: 204,
      data: null,
    };
  }

  async getAll(): Promise<HttpResponse> {
    const response = await this.pharmacyService.getAll();
    return {
      statusCode: 200,
      data: response,
    };
  }

  async getById({ params }: HttpRequest): Promise<HttpResponse> {
    const pharmacy = await this.pharmacyService.getById(params.id);
    return {
      statusCode: 200,
      data: pharmacy,
    };
  }
}
