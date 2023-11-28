import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PackageDto {
  // images
  @ApiProperty({
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  images: string[]

  // names
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

  // descriptions
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description_ne: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description_id: string;

  
  // Notes
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  notes_en: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  notes_ru: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  notes_ne: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  notes_id: string

  // Price
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  price_en: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  price_ru: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  price_ne: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  price_id: string

  // Duration
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  duration_en: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  duration_ru: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  duration_ne: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  duration_id: string

  // Type
  @ApiProperty({
    required: true,
  })
  @IsEnum(Type)
  @IsNotEmpty()
  type: Type

  // country_id
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  country_id: string

  // region_id
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  region_id?: string
}
