import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateMovementDto } from "./dto/create-movement.dto";
import { UpdateMovementDto } from "./dto/update-movement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Movement } from "./entities/movement.entity";
import { Repository } from "typeorm";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createMovementDto: CreateMovementDto): Promise<string> {
    try {
      const movement = this.movementRepository.create(createMovementDto);
      await this.movementRepository.save(movement);

      if (createMovementDto.type === "ENTRADA") {
        const product = await this.productRepository.findOneBy({ id: createMovementDto.productId });

        if (!product) {
          throw new ConflictException("Produto não encontrado");
        }

        product.currentQuantity += createMovementDto.quantity;

        await this.productRepository.save(product);
      } else if (createMovementDto.type === "SAIDA") {
        const product = await this.productRepository.findOneBy({ id: createMovementDto.productId });

        if (!product) {
          throw new ConflictException("Produto não encontrado");
        }

        product.currentQuantity -= createMovementDto.quantity;

        await this.productRepository.save(product);
      }
      return "Movimentação criado com sucesso";
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const movements = await this.movementRepository.find();
      return movements.length ? movements : "Você não possui nenhum Movimentação cadastrado";
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const movement = await this.movementRepository.findOneBy({ id });
      return movement ? movement : "Movimentação não encontrado";
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  // PRECISO COLOCAR UMA FUNÇÃO PRA ADICIONAR OU REMOVER PRODUTOS DE ACORDO COM A MOVIMENTAÇÃO
  async update(id: number, updateMovementDto: UpdateMovementDto) {
    try {
      const movement = await this.movementRepository.findOneBy({ id });
      if (!movement) {
        return "Movimentação não encontrado";
      }

      if (updateMovementDto.type === "ENTRADA" && updateMovementDto.quantity !== undefined) {
        const product = await this.productRepository.findOneBy({ id: updateMovementDto.productId });

        if (!product) {
          throw new ConflictException("Produto não encontrado");
        }

        product.currentQuantity += updateMovementDto.quantity;

        await this.productRepository.save(product);
      } else if (updateMovementDto.type === "SAIDA" && updateMovementDto.quantity !== undefined) {
        const product = await this.productRepository.findOneBy({ id: updateMovementDto.productId });

        if (!product) {
          throw new ConflictException("Produto não encontrado");
        }

        product.currentQuantity -= updateMovementDto.quantity;

        await this.productRepository.save(product);
      }

      await this.movementRepository.update(id, updateMovementDto);
      return "Movimentação atualizado com sucesso";
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const movement = await this.movementRepository.findOneBy({ id });
      if (!movement) {
        return "Movimentação não encontrado";
      }

      if (movement.type === "ENTRADA") {
        const product = await this.productRepository.findOneBy({ id: movement.productId });

        if (!product) {
          throw new ConflictException("Produto não encontrado");
        }

        product.currentQuantity -= movement.quantity;

        await this.productRepository.save(product);
      } else if (movement.type === "SAIDA") {
        const product = await this.productRepository.findOneBy({ id: movement.productId });

        if (!product) {
          throw new ConflictException("Produto não encontrado");
        }

        product.currentQuantity += movement.quantity;

        await this.productRepository.save(product);
      }

      await this.movementRepository.delete(id);
      return "Movimentação removido com sucesso";
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
