import { ApiProperty } from "@nestjs/swagger";
import { Permission } from "@prisma/client";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BilingDto {
    @ApiProperty({
        required: true,
      })
    @IsNumber()
    @IsNotEmpty()
    person: number;

    @ApiProperty({
      required: true,
    })
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        required: false,
      })
    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @ApiProperty({
      required: true,
    })
    @IsString()
    @IsNotEmpty()
    package_id: string;
}

export class PaymentDto {
  @ApiProperty({
      required: true,
    })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  order_id: string;
}