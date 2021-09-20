import { EntityRepository, In, Repository } from 'typeorm';
import { ILike } from 'typeorm';
import Unity from '../entities/Unity';

interface IFindUnits {
  id: string;
}

@EntityRepository(Unity)
export class UnityRepository extends Repository<Unity> {
  public async findByName(name: string): Promise<Unity | undefined> {
    const unity = this.findOne({
      where: {
        name,
      },
    });
    return unity;
  }

  public async findByIlikeName(name: string): Promise<Unity[] | undefined> {
    const unity = this.find({
      name: ILike('%' + name + '%'),
    });
    return unity;
  }

  public async findAllByIds(units: IFindUnits[]): Promise<Unity[]> {
    const unitIds = units.map(unit => unit.id);

    const existentUnits = await this.find({
      where: {
        id: In(unitIds),
      },
    });

    return existentUnits;
  }
}
