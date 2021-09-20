import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  customer_id: number;
  isAdmin: boolean;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    isAdmin,
    customer_id,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used!.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      customer_id,
      password: hashedPassword,
      isAdmin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
