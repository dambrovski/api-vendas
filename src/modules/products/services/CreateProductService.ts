import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
  category_id: number;
  unity_id: number;
}

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
    category_id,
    unity_id,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already one Product with this name!.');
    }

    //const redisCache = new RedisCache();
    const product = productsRepository.create({
      name,
      price,
      category_id,
      unity_id,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
