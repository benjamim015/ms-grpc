import faker from 'faker';
import { IProductService } from '../../src/application/contracts/product-service';
import { ProductDTO } from '../../src/application/product-dto';
import { Product } from '../../src/domain/product';
import { ProductController } from '../../src/infra/product-controller';

const productData = {
  id: faker.datatype.uuid(),
  thumbnail: faker.image.imageUrl(),
  name: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  ingredients: faker.lorem.sentence(),
  availability: faker.datatype.number(),
  volume: faker.datatype.number(),
  pharmacyId: faker.datatype.uuid(),
};

class ProductServiceStub implements IProductService {
  async create(product: ProductDTO): Promise<ProductDTO> {
    return product;
  }

  async update(product: ProductDTO, _id: string): Promise<ProductDTO> {
    return product;
  }

  async delete(_id: string): Promise<void> {
    return undefined;
  }

  async getById(_id: string): Promise<ProductDTO> {
    return new Product(productData);
  }

  async getAll(): Promise<ProductDTO[]> {
    return [new Product(productData)];
  }

  async clone(_productId: string, _pharmacyId: string): Promise<void> {
    return undefined;
  }
}

describe('ProductController', () => {
  let sut: ProductController;
  let productService: ProductServiceStub;

  beforeEach(() => {
    productService = new ProductServiceStub();
    sut = new ProductController(productService);
  });

  describe('create()', () => {
    it('should create a product', async () => {
      const response = await sut.create({ body: productData, params: {} });
      expect(response.statusCode).toBe(201);
      expect(response.data).toEqual(productData);
    });

    it('should call productService.create with correct values', async () => {
      const spy = jest.spyOn(productService, 'create');
      await sut.create({ body: productData, params: {} });
      expect(spy).toHaveBeenCalledWith(productData);
    });
  });

  describe('update()', () => {
    it('should update a product', async () => {
      const response = await sut.update({
        body: productData,
        params: { id: 'any-valid-id' },
      });
      expect(response.statusCode).toBe(200);
      expect(response.data).toEqual(productData);
    });

    it('should call productService.update with correct values', async () => {
      const spy = jest.spyOn(productService, 'update');
      await sut.update({ body: productData, params: { id: 'any-valid-id' } });
      expect(spy).toHaveBeenCalledWith(productData, 'any-valid-id');
    });
  });

  describe('delete()', () => {
    it('should delete a product', async () => {
      const response = await sut.delete({
        body: {},
        params: { id: 'any-valid-id' },
      });
      expect(response.statusCode).toBe(204);
    });

    it('should call productService.delete with correct values', async () => {
      const spy = jest.spyOn(productService, 'delete');
      await sut.delete({ body: {}, params: { id: 'any-valid-id' } });
      expect(spy).toHaveBeenCalledWith('any-valid-id');
    });
  });

  describe('getById()', () => {
    it('should get a product', async () => {
      const response = await sut.getById({
        body: {},
        params: { id: 'any-valid-id' },
      });
      expect(response.statusCode).toBe(200);
      expect(response.data).toEqual(productData);
    });

    it('should call productService.getById with correct values', async () => {
      const spy = jest.spyOn(productService, 'getById');
      await sut.getById({ body: {}, params: { id: 'any-valid-id' } });
      expect(spy).toHaveBeenCalledWith('any-valid-id');
    });
  });

  describe('getAll()', () => {
    it('should get all products', async () => {
      const response = await sut.getAll();
      expect(response.statusCode).toBe(200);
      expect(response.data).toEqual([productData]);
    });

    it('should call productService.getAll with correct values', async () => {
      const spy = jest.spyOn(productService, 'getAll');
      await sut.getAll();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('clone()', () => {
    it('should clone a product', async () => {
      const response = await sut.clone({
        body: {},
        params: { productId: 'any-valid-id', pharmacyId: 'any-valid-id' },
      });
      expect(response.statusCode).toBe(204);
    });

    it('should call productService.clone with correct values', async () => {
      const spy = jest.spyOn(productService, 'clone');
      await sut.clone({
        body: {},
        params: { productId: 'any-valid-id', pharmacyId: 'any-valid-id' },
      });
      expect(spy).toHaveBeenCalledWith('any-valid-id', 'any-valid-id');
    });
  });
});
