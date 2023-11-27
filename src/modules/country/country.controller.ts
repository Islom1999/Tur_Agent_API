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
import { CountryDto } from './dto/country.dto';
import { QueryDTO } from 'src/_query';
import { ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly _service: CountryService) {}

  
  @Post()
  create(@Body() dto: CountryDto) {
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
  update(@Param('id') id: string, @Body() dto: CountryDto) {
    return this._service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(id);
  }
}
