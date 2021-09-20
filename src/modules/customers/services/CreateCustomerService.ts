import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
  cnpj: number;
  cep: number;
  numero: number;
  rua: string;
  bairro: string;
  cidade: string;
  complemento: string;
}

class CreateCustomerService {
  public async execute({
    name,
    email,
    cnpj,
    cep,
    numero,
    rua,
    bairro,
    cidade,
    complemento,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used!.');
    }

    const user = customersRepository.create({
      name,
      email,
      cnpj,
      cep,
      numero,
      rua,
      bairro,
      cidade,
      complemento,
    });

    await customersRepository.save(user);

    return user;
  }
}

export default CreateCustomerService;
