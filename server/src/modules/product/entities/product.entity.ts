import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { Movement } from "src/modules/movement/entities/movement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  currentQuantity: number;

  @Column()
  minQuantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  purchasePrice: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  salePrice: number;

  @OneToMany(() => Movement, movement => movement.product)
  movements: Movement[];
}
