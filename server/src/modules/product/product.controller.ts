import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    if (!createProductDto.name || !createProductDto.currentQuantity || !createProductDto.minQuantity || !createProductDto.purchasePrice || !createProductDto.salePrice) {
      throw new ConflictException("Preencha todos os campos");
    }
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    if (isNaN(+id)) {
      throw new ConflictException("Id inválido");
    }
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    if (isNaN(+id)) {
      throw new ConflictException("Id inválido");
    }
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    if (isNaN(+id)) {
      throw new ConflictException("Id inválido");
    }
    return this.productService.remove(+id);
  }
}
