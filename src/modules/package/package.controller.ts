import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PermissionsGuard } from 'src/common/guards';
import { PackageDto } from './dto/package.dto';
import { QueryDTO } from 'src/_query';
import { ApiTags } from '@nestjs/swagger';
import { PackageService } from './package.service';
import { Public } from 'src/common/decorators';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(private readonly _service: PackageService) {}

  
  @Post()
  create(@Body() dto: PackageDto) {
    return this._service.create(dto);
  }

  @Public()
  @Get('')
  findAll() {
    return this._service.findAll();
  }

  @Public()
  @Get('pagination')
  findAllPercentage(@Query() queryDto: QueryDTO) {
    return this._service.findAllPercentage(queryDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: PackageDto) {
    return this._service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(id);
  }
}
