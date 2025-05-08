export class CreateProductDto {
  name: string;
  description?: string;
  currentQuantity: number;
  minQuantity: number;
  purchasePrice: number;
  salePrice: number;
}
