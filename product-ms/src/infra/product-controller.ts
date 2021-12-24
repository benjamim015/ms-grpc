import { IProductService } from '../application/contracts/product-service';
import { HttpRequest, HttpResponse } from '../shared/infra/http/http';

export class ProductController {
  constructor(private readonly productService: IProductService) {}

  async create({ body }: HttpRequest): Promise<HttpResponse> {
    const response = await this.productService.create(body);
    return {
      statusCode: 201,
      data: response,
    };
  }

  async update({ body, params }: HttpRequest): Promise<HttpResponse> {
    const response = await this.productService.update(body, params.id);
    return {
      statusCode: 200,
      data: response,
    };
  }

  async delete({ params }: HttpRequest): Promise<HttpResponse> {
    await this.productService.delete(params.id);
    return {
      statusCode: 204,
      data: null,
    };
  }

  async getById({ params }: HttpRequest): Promise<HttpResponse> {
    const response = await this.productService.getById(params.id);
    return {
      statusCode: 200,
      data: response,
    };
  }

  async getAll(): Promise<HttpResponse> {
    const response = await this.productService.getAll();
    return {
      statusCode: 200,
      data: response,
    };
  }

  async clone({ params }: HttpRequest): Promise<HttpResponse> {
    await this.productService.clone(params.productId, params.pharmacyId);
    return {
      statusCode: 204,
      data: null,
    };
  }
}
