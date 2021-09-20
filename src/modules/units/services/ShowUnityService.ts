import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Unity from '../typeorm/entities/Unity';
import { UnityRepository } from '../typeorm/repositories/UnitsRepository';

interface IRequest {
  id: string;
}

interface IRequestName {
  name: string;
}

class ShowUnityService {
  public async execute({ id }: IRequest): Promise<Unity | undefined> {
    const unitsRepository = getCustomRepository(UnityRepository);

    const unity = await unitsRepository.findOne(id);

    if (!unity) {
      throw new AppError('Unity not found!. ');
    }

    return unity;
  }
  public async searchUnityName({
    name,
  }: IRequestName): Promise<Unity[] | undefined> {
    const unitsRepository = getCustomRepository(UnityRepository);

    const unity = await unitsRepository.findByIlikeName(name);

    if (!unity) {
      throw new AppError('Unity not found!. ');
    }

    return unity;
  }
}

export default ShowUnityService;
