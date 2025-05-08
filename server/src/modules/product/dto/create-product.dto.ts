import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateProductDto {
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

  @IsNumber()
  salePrice: number;
}
