import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  name?: string | undefined;
  description?: string | undefined;
  currentQuantity?: number | undefined;
  minQuantity?: number | undefined;
  purchasePrice?: number | undefined;
  salePrice?: number | undefined;
}
