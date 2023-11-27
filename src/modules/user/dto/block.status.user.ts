import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class BlockStatusDto {
  @ApiProperty({
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isBlock: boolean;
}
