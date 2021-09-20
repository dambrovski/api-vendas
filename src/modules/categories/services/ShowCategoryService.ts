import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Category from '../typeorm/entities/Category';
import { CategoryRepository } from '../typeorm/repositories/CategoriesRepository';

interface IRequest {
  id: string;
}

interface IRequestName {
  name: string;
}

class ShowCategoryService {
  public async execute({ id }: IRequest): Promise<Category | undefined> {
    const categoriesRepository = getCustomRepository(CategoryRepository);

    const category = await categoriesRepository.findOne(id);

    if (!category) {
      throw new AppError('Category not found!. ');
    }

    return category;
  }
  public async searchCategoryName({
    name,
  }: IRequestName): Promise<Category[] | undefined> {
    const categoriesRepository = getCustomRepository(CategoryRepository);

    const category = await categoriesRepository.findByIlikeName(name);

    if (!category) {
      throw new AppError('Category not found!. ');
    }

    return category;
  }
}

export default ShowCategoryService;
