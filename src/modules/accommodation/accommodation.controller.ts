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
import { AccommodationDto } from './dto/accommodation.dto';
import { QueryDTO } from 'src/_query';
import { ApiTags } from '@nestjs/swagger';
import { AccommodationService } from './accommodation.service';
import { Public } from 'src/common/decorators';

@ApiTags('Accommodation')
@Controller('accommodation')
export class AccommodationController {
  constructor(private readonly _service: AccommodationService) {}

  @Post()
  create(@Body() dto: AccommodationDto) {
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
  update(@Param('id') id: string, @Body() dto: AccommodationDto) {
    return this._service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(id);
  }
}
