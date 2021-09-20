import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Unity from '../typeorm/entities/Unity';
import { UnityRepository } from '../typeorm/repositories/UnitsRepository';

interface IRequest {
  id: string;
  name: string;
  initials: string;
}

class UpdateUnityService {
  public async execute({ id, name, initials }: IRequest): Promise<Unity> {
    const unitsRepository = getCustomRepository(UnityRepository);

    const unity = await unitsRepository.findOne(id);

    if (!unity) {
      throw new AppError('Unity not found!. ');
    }

    const unityExists = await unitsRepository.findByName(name);
    if (unityExists) {
      throw new AppError('There is already one Unity with this name!.');
    }

    unity.name = name;
    unity.initials = initials;

    await unitsRepository.save(unity);
    return unity;
  }
}

export default UpdateUnityService;
