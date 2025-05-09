import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement) 
    private readonly movementRepository: Repository<Movement>,
  ){}

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
      return movements.length ? movements : "Você não possui nenhum movimento cadastrado";
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} movement`;
  }

  update(id: number, updateMovementDto: UpdateMovementDto) {
    return `This action updates a #${id} movement`;
  }

  remove(id: number) {
    return `This action removes a #${id} movement`;
  }
}
