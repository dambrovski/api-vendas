import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import uploadConfig from '@config/upload';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  product_id: string;
  photoFilename: string;
}

class UpdateProductPhotoService {
  public async execute({
    product_id,
    photoFilename,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    if (product.photo) {
      const productPhotoFilePath = path.join(
        uploadConfig.directory,
        product.photo,
      );
      const productPhotoFileExists = await fs.promises.stat(
        productPhotoFilePath,
      );

      if (productPhotoFileExists) {
        await fs.promises.unlink(productPhotoFilePath);
      }
    }

    product.photo = photoFilename;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductPhotoService;
