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

  async findAll() {
    const model = await this._prisma.order.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        client: {
          select:{
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
          }
        },
        package: {
          select: {
            id: true,
            name_en: true,
            name_ne: true,
            name_id: true,
            name_ru: true,
          }
        },
        Payment: true
      }
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return model;
  }

  async findAllPercentage(queryDto: QueryDTO) {
    const page = +queryDto.page || 1;
    const limit = +queryDto.limit || 25;
    const skip = (page - 1) * limit;
    const count = await this._prisma.order.count({
      where: {
        client_id: queryDto.id
      },
    });

    const model = await this._prisma.order.findMany({
      where: {
        client_id: queryDto.id
      },
      orderBy: { createdAt: 'asc' },
      skip,
      take: limit,
      include: {
        client: {
          select:{
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
          }
        },
        package: {
          select: {
            id: true,
            name_en: true,
            name_ne: true,
            name_id: true,
            name_ru: true,
          }
        },
        Payment: true
      }
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);
 
    return { data: model, count };
  }

  async findOne(id: string) {
    const model = await this._prisma.order.findUnique({ 
      where: { id },
      include: {
        client: {
          select:{
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
          }
        },
        package: {
          select: {
            id: true,
            name_en: true,
            name_ne: true,
            name_id: true,
            name_ru: true,
          }
        },
        Payment: true
      }
    });
    if (!model) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return model;
  }

  async update(id: string, dto: BilingDto) {
    const modelExist = await this._prisma.order.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const model = await this._prisma.order.update({
      where: { id },
      data: dto,
    });
    return model;
  }

  async remove(id: string) {
    const modelExist = await this._prisma.order.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const model = await this._prisma.order.delete({
      where: { id },
    });
    
    return model
  }

  // client orders
  async findAllClinet(userId: string) {
    const model = await this._prisma.order.findMany({
      where: {
        client_id: userId
      },
      orderBy: { createdAt: 'asc' },
      include: {
        client: {
          select:{
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
          }
        },
        package: {
          select: {
            id: true,
            name_en: true,
            name_ne: true,
            name_id: true,
            name_ru: true,
          }
        },
        Payment: true
      }
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return model;
  }

  async findAllPercentageClinet(queryDto: QueryDTO, userId: string) {
    const page = +queryDto.page || 1;
    const limit = +queryDto.limit || 25;
    const skip = (page - 1) * limit;
    const count = await this._prisma.order.count({
      where: {
        client_id: userId
      },
    });

    const model = await this._prisma.order.findMany({
      where: {
        client_id: userId
      },
      orderBy: { createdAt: 'asc' },
      skip,
      take: limit,
      include: {
        client: {
          select:{
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
          }
        },
        package: {
          select: {
            id: true,
            name_en: true,
            name_ne: true,
            name_id: true,
            name_ru: true,
          }
        },
        Payment: true
      }
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);
 
    return { data: model, count };
  }

 
}
