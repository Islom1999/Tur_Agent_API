import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AccommodationDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  night: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hotel_en: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hotel_ru: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hotel_ne: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hotel_id: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  package_id: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  region_id: string
}
