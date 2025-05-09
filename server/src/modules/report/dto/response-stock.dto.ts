import { ApiProperty } from "@nestjs/swagger";

export class ResStockDto {
  @ApiProperty({ example: "Refrigerante" })
  nameProduct: string;
  
  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: "10" })
  minQuantity: number;
}
