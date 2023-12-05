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
import { BilingService } from './billing.service';
import { PermissionsGuard } from 'src/common/guards';
import { GetCurrentUserId, Permissions, Public } from 'src/common/decorators';
import { BilingDto, PaymentDto } from './dto/billing.dto';
import { QueryDTO } from 'src/_query';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class BilingController {
  constructor(private readonly paymentService: BilingService) {}

  @Post()
  async create(
    @Body() dto: BilingDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.paymentService.create(dto, userId);
  }

  
  @Post('charge')
  async charge(
    @Body() dto: PaymentDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.paymentService.createCharge(dto, userId);
  }

  @Public()
  @Get('')
  findAll() {
    return this.paymentService.findAll();
  }

  @Public()
  @Get('pagination')
  findAllPercentage(@Query() queryDto: QueryDTO) {
    return this.paymentService.findAllPercentage(queryDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: BilingDto) {
    return this.paymentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }

  // client methods
  // @Public()
  @Get('clinet')
  findAllClient(@GetCurrentUserId() userId: string) {
    return this.paymentService.findAllClinet(userId);
  }

  // @Public()
  @Get('/clinet/pagination')
  findAllPercentageClinet(
    @Query() queryDto: QueryDTO,
    @GetCurrentUserId() userId: string
  ) {
    return this.paymentService.findAllPercentageClinet(queryDto, userId);
  }


}
