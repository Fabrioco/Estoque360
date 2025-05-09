import { IsBoolean, IsNumber, IsOptional } from "@nestjs/class-validator";

export class minQuantityDto {
  @IsNumber()
  @IsOptional()
  minQuantity?: number;

  @IsBoolean()
  @IsOptional()
  includeZero?: boolean;
}
