import { getCustomRepository } from 'typeorm';
import Unity from '../typeorm/entities/Unity';
import { UnityRepository } from '../typeorm/repositories/UnitsRepository';

class ListUnityService {
  public async execute(): Promise<Unity[]> {
    const unitsRepository = getCustomRepository(UnityRepository);
    const units = await unitsRepository.find({});

    return units;
  }
}

export default ListUnityService;
