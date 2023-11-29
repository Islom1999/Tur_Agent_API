import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { PermissionsGuard } from 'src/common/guards';
import { Permissions } from 'src/common/decorators';
import { RoleDto } from './dto/role.dto';
import { QueryDTO } from 'src/_query';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Permissions('role_create')
  // @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() roleDto: RoleDto) {
    return this.roleService.create(roleDto);
  } 

  // @Permissions('role_view')
  // @UseGuards(PermissionsGuard)
  @Get('')
  findAll() {
    return this.roleService.findAll();
  }

  // @Permissions('role_view')
  // @UseGuards(PermissionsGuard)
  @Get('percentage')
  findAllPercentage(@Query() queryDto: QueryDTO) {
    return this.roleService.findAllPercentage(queryDto);
  }

  // @Permissions('role_view')
  // @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  // @Permissions('role_update')
  // @UseGuards(PermissionsGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() roleDto: RoleDto) {
    return this.roleService.update(id, roleDto);
  }

  // @Permissions('role_delete')
  // @UseGuards(PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
