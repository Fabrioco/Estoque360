import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  currentQuantity: number;

  @IsNumber()
  minQuantity: number;

  @IsNumber()
  purchasePrice: number;
}
