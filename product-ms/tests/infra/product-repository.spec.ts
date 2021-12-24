import { Prisma } from '@prisma/client';
import faker from 'faker';
import { prismaMock } from '../../singleton';
import { Product } from '../../src/domain/product';
import { ProductRepository } from '../../src/infra/product-repository';

const productData = {
  thumbnail: faker.image.imageUrl(),
  name: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  ingredients: faker.lorem.sentence(),
  availability: faker.datatype.number(),
  volume: faker.datatype.number(),
  pharmacyId: faker.datatype.uuid(),
};

const mapper = (product: Product) => ({
  id: product.id,
  thumbnail: product.thumbnail,
  name: product.name,
  price: product.price as unknown as Prisma.Decimal,
  ingredients: product.ingredients,
  availability: product.availability,
  volume: product.volume as unknown as Prisma.Decimal,
  pharmacyId: product.pharmacyId,
});

describe('ProductRepository', () => {
  let sut: ProductRepository;

  beforeEach(() => {
    sut = new ProductRepository();
  });

  it('insert', async () => {
    const product = new Product(productData);
    prismaMock.product.create.mockResolvedValue(mapper(product));
    await sut.create(product);
    expect(prismaMock.product.create).toBeCalledWith({
      data: mapper(product),
    });
  });

  it('update', async () => {
    const product = new Product(productData);
    prismaMock.product.update.mockResolvedValue(mapper(product));
    await sut.update(product);
    expect(prismaMock.product.update).toBeCalledWith({
      where: { id: product.id },
      data: mapper(product),
    });
  });

  it('delete', async () => {
    const product = new Product(productData);
    prismaMock.product.delete.mockResolvedValue(mapper(product));
    await sut.delete(product.id);
    expect(prismaMock.product.delete).toBeCalledWith({
      where: { id: product.id },
    });
  });

  it('get', async () => {
    const product = new Product(productData);
    prismaMock.product.findUnique.mockResolvedValue(mapper(product));
    const result = await sut.get(product.id);
    expect(prismaMock.product.findUnique).toBeCalledWith({
      where: { id: product.id },
    });
    expect(result).toBeInstanceOf(Product);
  });

  it('getAll', async () => {
    const product = new Product(productData);
    prismaMock.product.findMany.mockResolvedValue([mapper(product)]);
    const result = await sut.getAll();
    expect(prismaMock.product.findMany).toBeCalled();
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(Product);
  });

  it('clone', async () => {
    const product = new Product(productData);
    prismaMock.product.create.mockResolvedValue(mapper(product));
    await sut.clone(product, product.pharmacyId);
    expect(prismaMock.product.create).toBeCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          thumbnail: product.thumbnail,
          name: product.name,
          price: product.price as unknown as Prisma.Decimal,
          ingredients: product.ingredients,
          availability: product.availability,
          volume: product.volume as unknown as Prisma.Decimal,
          pharmacyId: product.pharmacyId,
        }),
      }),
    );
  });
});
