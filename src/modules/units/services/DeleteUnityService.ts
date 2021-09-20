import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UnityRepository } from '../typeorm/repositories/UnitsRepository';

interface IRequest {
  id: string;
}

class DeleteUnityService {
  public async execute({ id }: IRequest): Promise<void> {
    const unitsRepository = getCustomRepository(UnityRepository);

    const unity = await unitsRepository.findOne(id);

    if (!unity) {
      throw new AppError('Unity not found!. ');
    }

    await unitsRepository.remove(unity);
  }
}

export default DeleteUnityService;
