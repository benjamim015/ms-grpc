import faker from 'faker';
import { Product } from '../../src/domain/product';

const productData = {
  thumbnail: faker.image.imageUrl(),
  name: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  ingredients: faker.lorem.sentence(),
  availability: faker.datatype.number(),
  volume: faker.datatype.number(),
  pharmacyId: faker.datatype.uuid(),
};

describe('Product', () => {
  it('should not be able to create a product without thumbnail', () => {
    expect(() => new Product({ ...productData, thumbnail: '' })).toThrowError(
      'Thumbnail is required',
    );
  });

  it('should not be able to create a product without name', () => {
    expect(() => new Product({ ...productData, name: '' })).toThrowError(
      'Name is required',
    );
  });

  it('should not be able to create a product without price', () => {
    expect(() => new Product({ ...productData, price: 0 })).toThrowError(
      'Price is required',
    );
  });

  it('should not be able to create a product without ingredients', () => {
    expect(() => new Product({ ...productData, ingredients: '' })).toThrowError(
      'Ingredients is required',
    );
  });

  it('should not be able to create a product without availability', () => {
    expect(() => new Product({ ...productData, availability: 0 })).toThrowError(
      'Availability is required',
    );
  });

  it('should not be able to create a product without volume', () => {
    expect(() => new Product({ ...productData, volume: 0 })).toThrowError(
      'Volume is required',
    );
  });

  it('should not be able to create a product without pharmacyId', () => {
    expect(() => new Product({ ...productData, pharmacyId: '' })).toThrowError(
      'PharmacyId is required',
    );
  });
});
