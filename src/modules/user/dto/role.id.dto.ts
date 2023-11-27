import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class RoleIdDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  role_id: string;

  @ApiProperty({
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isBlock: boolean;
}
