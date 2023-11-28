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
import { HighlightDto } from './dto/highlight.dto';
import { QueryDTO } from 'src/_query';
import { ApiTags } from '@nestjs/swagger';
import { HighlightService } from './highlight.service';

@ApiTags('Highlight')
@Controller('highlight')
export class HighlightController {
  constructor(private readonly _service: HighlightService) {}

  
  @Post()
  create(@Body() dto: HighlightDto) {
    return this._service.create(dto);
  }

  @Get('')
  findAll() {
    return this._service.findAll();
  }

  @Get('pagenatoin')
  findAllPercentage(@Query() queryDto: QueryDTO) {
    return this._service.findAllPercentage(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: HighlightDto) {
    return this._service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(id);
  }
}
