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
import { RegionDto } from './dto/region.dto';
import { QueryDTO } from 'src/_query';
import { ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { Public } from 'src/common/decorators';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly _service: RegionService) {}

  
  @Post()
  create(@Body() dto: RegionDto) {
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
  update(@Param('id') id: string, @Body() dto: RegionDto) {
    return this._service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(id);
  }
}
