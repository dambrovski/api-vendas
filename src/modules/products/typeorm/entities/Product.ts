import OrderProducts from '../../../orders/typeorm/entities/OrdersProducts';
import Category from '../../../categories/typeorm/entities/Category';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Unity from '../../../units/typeorm/entities/Unity';
import { Expose } from 'class-transformer';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrderProducts, order_products => order_products.product)
  order_products: OrderProducts[];

  @ManyToOne(() => Category, category => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Unity, unity => unity.product)
  @JoinColumn({ name: 'unity_id' })
  unity: Unity;

  @Column()
  category_id: number;

  @Column()
  unity_id: number;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'photo_url' })
  //aqui o nome precisa ser padrão de acordo com o nome acima
  getPhotoUrl(): string | null {
    if (!this.photo) {
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.photo}`;
  }
}

export default Product;
