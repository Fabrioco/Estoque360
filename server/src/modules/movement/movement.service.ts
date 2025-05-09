import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateMovementDto } from "./dto/create-movement.dto";
import { UpdateMovementDto } from "./dto/update-movement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Movement } from "./entities/movement.entity";
import { Repository } from "typeorm";

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
  ) {}

  async create(createMovementDto: CreateMovementDto) {
    try {
      const movement = this.movementRepository.create(createMovementDto);
      return await this.movementRepository.save(movement);
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

  async update(id: number, updateMovementDto: UpdateMovementDto) {
    try {
      const movement = await this.movementRepository.findOneBy({ id });
      if (!movement) {
        return "Movimentação não encontrado";
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

  remove(id: number) {
    return `This action removes a #${id} movement`;
  }
}
