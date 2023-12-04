import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BilingDto, PaymentDto } from './dto/billing.dto';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { RoleType } from 'src/enumerations';
import { QueryDTO } from 'src/_query';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BilingService {
  private stripe: Stripe;

  constructor(
    private _prisma: PrismaService,
    private config: ConfigService
  ) {
    this.stripe = new Stripe(config.get<string>('STRIPE_KEY'), {
      // apiVersion: 'v3'
    });
  }

  async create(dto: BilingDto, userId: string) {
    try {
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString(); // 6 raqamli kod

      const order = await this._prisma.order.create({
        data: {
          amount: 10000,
          person: dto.person,
          description: dto.description,
          date: dto.date,
          code: verificationCode,

          client_id: userId,
          package_id: dto.package_id
        }
      });
      
      return order   

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createCharge(dto: PaymentDto, userId:string) {
    try {
      const order = await this._prisma.order.findUnique({where: {id: dto.order_id}, include: {package: true}})
      const client = await this._prisma.client.findUnique({where: {id: userId}})
      
      if(!order){
        throw new HttpException('order not found', HttpStatus.BAD_REQUEST);
      }

      if(!client){
        throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
      }

      const charge = await this.stripe.charges.create({
        amount:  10000,
        currency:  'USD',
        source: dto.token,
        description: `Clent: Fullname - ${client.firstname} ${client.lastname},  Package: ${order.package.name_en}, Date: ${order.date}`,
        metadata: {
          user: client.firstname + ' ' + client.lastname, 
          userId, 
          package: order.package.name_en, 
          packageId: order.package_id, 
          orderId: order.id, 
          date: order.date, 
          code: order.code
        }
      });

      const payment = await this._prisma.payment.create({data: {
        amount: charge.amount,
        currency: charge.currency,
        description: charge.description,
        client_id: userId,
        order_id: order.id,
        charge_id: charge.id,
      }})
  
      return payment; 
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async retrieveBalance() {
    return this.stripe.balance.retrieve();
  }


 
}
