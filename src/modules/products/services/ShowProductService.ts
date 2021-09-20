import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

interface IRequestName {
  name: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!. ');
    }

    return product;
  }
  public async searchProductName({
    name,
  }: IRequestName): Promise<Product[] | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findByIlikeName(name);

    if (!product) {
      throw new AppError('Product not found!. ');
    }

    return product;
  }
}

export default ShowProductService;
