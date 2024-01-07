import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BlogDto {

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
  title_en: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title_ne: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title_id: string;

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
  @IsDate()
  @IsOptional()
  date: Date;
}
