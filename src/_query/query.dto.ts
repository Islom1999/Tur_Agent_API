import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number | string;

  @IsOptional()
  limit?: number | string;
}
