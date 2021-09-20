import Product from '../../../products/typeorm/entities/Product';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('units')
class Unity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Product, product => product.unity, {
    cascade: true,
  })
  product: Product[];

  @Column()
  name: string;

  @Column()
  initials: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Unity;
