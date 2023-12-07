import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum SortBase {
  Views = 'Views',
  CreatedAt = 'CreatedAt'
}

export class QueryDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number | string;

  @IsOptional()
  limit?: number | string;

  @IsOptional()
  @IsString()
  id?:string; 

  @IsOptional()
  @IsEnum(SortBase)
  sort?: SortBase;
}