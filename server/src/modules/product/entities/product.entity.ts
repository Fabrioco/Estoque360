import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  @IsOptional()
  description?: string;

  @Column()
  @IsNumber()
  currentQuantity: number;

  @Column()
  @IsNumber()
  minQuantity: number;

  @Column()
  @IsNumber()
  salePrice: number;

  @Column()
  @IsNumber()
  purchasePrice: number;
}
