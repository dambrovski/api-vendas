import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Customer from '../../../customers/typeorm/entities/Customer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude() //notacao para não trazer no retorno das chamadas a senha do usuario
  password: string;

  //chave estrangeira tabela customers
  @ManyToOne(() => Customer, customers => customers.id)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  avatar: string;

  @Column()
  isAdmin: boolean;

  @Column()
  customer_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  //aqui o nome precisa ser padrão de acordo com o nome acima
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }
}

export default User;
