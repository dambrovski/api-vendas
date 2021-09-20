import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../typeorm/repositories/CategoriesRepository';

interface IRequest {
  id: string;
}

class DeleteCategoryService {
  public async execute({ id }: IRequest): Promise<void> {
    const categoriesRepository = getCustomRepository(CategoryRepository);

    const category = await categoriesRepository.findOne(id);

    if (!category) {
      throw new AppError('Category not found!.');
    }

    await categoriesRepository.remove(category);
  }
}

export default DeleteCategoryService;
