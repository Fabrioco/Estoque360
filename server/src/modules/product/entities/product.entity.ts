import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
