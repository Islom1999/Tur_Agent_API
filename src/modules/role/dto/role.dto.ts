import { ApiProperty } from "@nestjs/swagger";
import { Permission } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class RoleDto {
    @ApiProperty({
        required: true,
      })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        required: true,
      })
    @IsEnum(Permission, {each: true})
    @IsNotEmpty()
    permissions: Permission[];
}
