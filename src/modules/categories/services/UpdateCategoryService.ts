import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Category from '../typeorm/entities/Category';
import { CategoryRepository } from '../typeorm/repositories/CategoriesRepository';

interface IRequest {
  id: string;
  name: string;
}

class UpdateCategoryService {
  public async execute({ id, name }: IRequest): Promise<Category> {
    const categoriesRepository = getCustomRepository(CategoryRepository);

    const category = await categoriesRepository.findOne(id);

    if (!category) {
      throw new AppError('Category not found!. ');
    }

    const categoryExists = await categoriesRepository.findByName(name);
    if (categoryExists) {
      throw new AppError('There is already one Category with this name!.');
    }

    category.name = name;

    await categoriesRepository.save(category);
    return category;
  }
}

export default UpdateCategoryService;
