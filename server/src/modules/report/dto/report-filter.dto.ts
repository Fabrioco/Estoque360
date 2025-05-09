import { IsDateString, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class ReportFilterDto {
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  productId?: number;
}
