import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Movement } from "../movement/entities/movement.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product,Movement])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
