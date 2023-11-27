import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CountryDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name_ne: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name_id: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  description_en?: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  description_ru?: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  description_ne?: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  description_id?: string;
}
