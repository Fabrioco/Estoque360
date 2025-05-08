import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  name?: string | undefined;

  @IsString()
  @IsOptional()
  description?: string | undefined;

  @IsNumber()
  currentQuantity?: number | undefined;

  @IsNumber()
  minQuantity?: number | undefined;

  @IsNumber()
  purchasePrice?: number | undefined;

  @IsNumber()
  salePrice?: number | undefined;
}
