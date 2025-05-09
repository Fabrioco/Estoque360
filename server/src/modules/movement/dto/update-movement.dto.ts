import { PartialType } from "@nestjs/mapped-types";
import { CreateMovementDto, MovementType } from "./create-movement.dto";
import { IsNumber, IsString } from "@nestjs/class-validator";

export class UpdateMovementDto extends PartialType(CreateMovementDto) {
  @IsNumber()
  productId?: string | undefined;

  @IsString()
  reason?: string | undefined;

  @IsNumber()
  quantity?: number | undefined;

  @IsString()
  date?: string | undefined;

  @IsString()
  type?: MovementType | undefined;
}
