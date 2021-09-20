import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Unity from '../typeorm/entities/Unity';
import { UnityRepository } from '../typeorm/repositories/UnitsRepository';

interface IRequest {
  name: string;
  initials: string;
}

class CreateUnityService {
  public async execute({ name, initials }: IRequest): Promise<Unity> {
    const unitsRepository = getCustomRepository(UnityRepository);
    const unityExists = await unitsRepository.findByName(name);
    if (unityExists) {
      throw new AppError('There is already one Unity with this name!.');
    }

    const unity = unitsRepository.create({
      name,
      initials,
    });

    await unitsRepository.save(unity);

    return unity;
  }
}

export default CreateUnityService;
