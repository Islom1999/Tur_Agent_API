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


}
