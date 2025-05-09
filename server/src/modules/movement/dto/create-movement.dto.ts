import { IsString, IsEnum, IsNumber, IsDateString, IsOptional } from "@nestjs/class-validator";

export enum MovementType {
  ENTRADA = "ENTRADA",
  SAIDA = "SAIDA",
}

export class CreateMovementDto {
  @IsString()
  productId: number;

  @IsEnum(MovementType)
  type: MovementType;

  @IsNumber()
  quantity: number;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
