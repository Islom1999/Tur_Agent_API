import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PlanningDto {
  @ApiProperty({
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  images: string[]

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

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  country_id: string

}
