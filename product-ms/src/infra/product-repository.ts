/* eslint-disable class-methods-use-this */
import { randomUUID } from 'crypto';
import { ProductMapper } from '../application/product-mapper';
import { Product } from '../domain/product';
import { IProductRepository } from '../domain/product-repository';
import prismaClient from './prisma-client';

export class ProductRepository implements IProductRepository {
  async create(product: Product): Promise<void> {
    await prismaClient.product.create({
      data: product,
    });
  }

  async update(product: Product): Promise<void> {
    await prismaClient.product.update({
      data: product,
      where: { id: product.id },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.product.delete({
      where: { id },
    });
  }

  async get(id: string): Promise<Product | undefined> {
    const foundProduct = await prismaClient.product.findUnique({
      where: { id },
    });
    if (!foundProduct) return undefined;
    return ProductMapper.toDomain({
      ...foundProduct,
      price: Number(foundProduct.price),
      volume: Number(foundProduct.volume),
    });
  }

  async getAll(): Promise<Product[]> {
    const foundProducts = await prismaClient.product.findMany();
    return foundProducts.map((product) =>
      ProductMapper.toDomain({
        ...product,
        price: Number(product.price),
        volume: Number(product.volume),
      }),
    );
  }

  async clone(product: Product, pharmacyId: string): Promise<void> {
    await prismaClient.product.create({
      data: {
        ...product,
        pharmacyId,
        id: randomUUID(),
      },
    });
  }
}
