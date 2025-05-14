import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, ForbiddenException } from "@nestjs/common";
import { MovementService } from "./movement.service";
import { CreateMovementDto } from "./dto/create-movement.dto";
import { UpdateMovementDto } from "./dto/update-movement.dto";

@Controller("movement")
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    if (!createMovementDto.productId || !createMovementDto.type) {
      throw new ForbiddenException("Preencha todos os campos");
    }
    const now = new Date();
    const offSet = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offSet).toISOString().slice(0, 19);
    createMovementDto.date = localISOTime;
    return this.movementService.create(createMovementDto);
  }

  @Get()
  findAll() {
    return this.movementService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    if (isNaN(+id)) {
      throw new ConflictException("Id inválido");
    }
    return this.movementService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMovementDto: UpdateMovementDto) {
    if (isNaN(+id)) {
      throw new ConflictException("Id inválido");
    }
    return this.movementService.update(+id, updateMovementDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    if (isNaN(+id)) {
      throw new ConflictException("Id inválido");
    }
    return this.movementService.remove(+id);
  }
}
