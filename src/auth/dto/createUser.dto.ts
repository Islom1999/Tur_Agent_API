import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    required: false,
  })
  @Optional()
  @IsBoolean()
  isBlock?: boolean;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsString()
  role_id?: string;
}
