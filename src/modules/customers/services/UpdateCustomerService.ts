import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
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
class UpdateCustomerService {
  public async execute({
    id,
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

    //sempre q consultar o banco colocar um await
    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists && email != customer.email) {
      throw new AppError('There is already one Customer with this email!');
    }

    customer.name = name;
    customer.email = email;
    customer.cnpj = cnpj;
    customer.cep = cep;
    customer.numero = numero;
    customer.rua = rua;
    customer.bairro = bairro;
    customer.cidade = cidade;
    customer.complemento = complemento;

    await customersRepository.save(customer);
    return customer;
  }
}

export default UpdateCustomerService;
