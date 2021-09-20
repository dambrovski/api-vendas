import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Category from '../typeorm/entities/Category';
import { CategoryRepository } from '../typeorm/repositories/CategoriesRepository';

interface IRequest {
  name: string;
}

class CreateCategoryService {
  public async execute({ name }: IRequest): Promise<Category> {
    const categoriesRepository = getCustomRepository(CategoryRepository);
    const categoryExists = await categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new AppError('There is already one Category with this name!.');
    }

    const category = categoriesRepository.create({
      name,
    });

    await categoriesRepository.save(category);
    return category;
  }
}

export default CreateCategoryService;
