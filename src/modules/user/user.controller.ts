import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Permission, User } from '@prisma/client';
import { PermissionsGuard } from 'src/common/guards';
import { GetCurrentUserId, Permissions } from 'src/common/decorators';
import { RoleIdDto } from './dto/role.id.dto';
import { BlockStatusDto } from './dto/block.status.user';
import { QueryDTO } from 'src/_query';
import { CreateUserDto, UpdatePasswordDto } from 'src/auth/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin users')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Permissions('user_create')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create')
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.service.createUser(userDto);
  }

  @Permissions('user_view')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(@Query() queryDto: QueryDTO): Promise<User[]> {
    return this.service.getAll(queryDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('permission')
  async getPermissionByToken(
    @GetCurrentUserId() userId: string,
  ): Promise<Permission[]> {
    return this.service.getPermissionByToken(userId);
  }

  @Permissions('user_view')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return this.service.getById(id);
  }

  @Permissions('user_update')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async addRoleById(
    @Param('id') id: string,
    @Body() roleIdDto: RoleIdDto,
  ): Promise<User> {
    return this.service.addRoleById(id, roleIdDto);
  }

  @Permissions('user_update')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/password/update/:id')
  async updatePasswordUser(
    @Param('id') id: string,
    @Body() userPassword: UpdatePasswordDto,
  ): Promise<User> {
    return this.service.updatePasswordUser(id, userPassword);
  }

  @Permissions('user_update')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async removeRoleById(@Param('id') id: string): Promise<User> {
    return this.service.removeRoleById(id);
  }

  @Permissions('user_update')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @Post('block/:id')
  async blockUserById(
    @Param('id') id: string,
    @Body() blockStatusDto: BlockStatusDto,
  ): Promise<User> {
    return this.service.blockUserById(id, blockStatusDto);
  }
}
