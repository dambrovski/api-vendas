import { EntityRepository, In, Repository } from 'typeorm';
import { ILike } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
  public async findByIlikeName(name: string): Promise<Product[] | undefined> {
    const product = this.find({
      name: ILike('%' + name + '%'),
    });
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        id,
      },
    });
    return product;
  }

  public async findProductsAndCategories(
    name: string,
  ): Promise<Product[] | undefined> {
    const product = this.find({
      name: ILike('%' + name + '%'),
    });
    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }
}
