import { EntityRepository, In, Repository } from 'typeorm';
import { ILike } from 'typeorm';
import Category from '../entities/Category';

interface IFindCategories {
  id: string;
}

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public async findByIlikeName(name: string): Promise<Category[] | undefined> {
    const category = this.find({
      name: ILike('%' + name + '%'),
    });
    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.findOne({
      where: {
        name,
      },
    });
    return category;
  }

  public async findAllByIds(
    categories: IFindCategories[],
  ): Promise<Category[]> {
    const categoriesIds = categories.map(category => category.id);

    const existentCategories = await this.find({
      where: {
        id: In(categoriesIds),
      },
    });

    return existentCategories;
  }
}
