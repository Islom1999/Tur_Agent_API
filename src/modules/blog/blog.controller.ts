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
import { BlogDto } from './dto/blog.dto';
import { QueryDTO } from 'src/_query';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { Public } from 'src/common/decorators';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly _service: BlogService) {}

  
  @Post()
  create(@Body() dto: BlogDto) {
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
  update(@Param('id') id: string, @Body() dto: BlogDto) {
    return this._service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(id);
  }
}
