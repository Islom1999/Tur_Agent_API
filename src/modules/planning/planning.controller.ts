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
import { PlanningDto } from './dto/planning.dto';
import { QueryDTO } from 'src/_query';
import { ApiTags } from '@nestjs/swagger';
import { PlanningService } from './planning.service';
import { Public } from 'src/common/decorators';

@ApiTags('Planning')
@Controller('planning')
export class PlanningController {
  constructor(private readonly _service: PlanningService) {}

  
  @Post()
  create(@Body() dto: PlanningDto) {
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
  update(@Param('id') id: string, @Body() dto: PlanningDto) {
    return this._service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(id);
  }
}
