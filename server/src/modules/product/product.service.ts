import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Movement } from "../movement/entities/movement.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return { message: "Produto criado com sucesso" };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Product[] | string> {
    try {
      const products = await this.productRepository.find();
      return products.length ? products : [];
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      return product ? product : "Produto não encontrado";
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        return "Produto não encontrado";
      }
      await this.productRepository.update(id, updateProductDto);
      return "Produto atualizado com sucesso";
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        return "Produto não encontrado";
      }
      const movements = await this.movementRepository.find({
        where: {
          productId: id,
        },
      });
      for (const movement of movements) {
        await this.movementRepository.delete(movement.id);
      }
      await this.productRepository.delete(id);
      return "Produto removido com sucesso";
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
