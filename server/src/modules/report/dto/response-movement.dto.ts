import { ApiProperty } from "@nestjs/swagger";

export class ResMovementDto {
  @ApiProperty({ example: "2025-05-10" })
  date: string;

  @ApiProperty({ example: "Refrigerante" })
  nameProduct: string;

  @ApiProperty({ example: "ENTRADA" })
  type: string;

  @ApiProperty({ example: 10 })
  quantity: number;
}
