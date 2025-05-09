import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  type: string;

  @Column()
  quantity: number;

  @Column()
  date: string;

  @Column()
  reason: string;

  @ManyToOne(() => Product, (product) => product.movements)
  product: Product;
}
