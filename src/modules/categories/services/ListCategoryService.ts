import { getCustomRepository } from 'typeorm';
import Category from '../typeorm/entities/Category';
import { CategoryRepository } from '../typeorm/repositories/CategoriesRepository';

class ListCategoryService {
  public async execute(): Promise<Category[]> {
    const categoriesRepository = getCustomRepository(CategoryRepository);

    //redis cache
    //const redisCache = new RedisCache();

    const categories = await categoriesRepository.find();

    return categories;
  }
}

export default ListCategoryService;
