import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CountryDto } from './dto/country.dto';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { QueryDTO } from 'src/_query';

@Injectable()
export class CountryService {
  constructor(private _prisma: PrismaService) {}

  async create(dto: CountryDto) {
    try {
      const model = await this._prisma.country.create({ data: dto });
      return model;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('This model already exists');
      }
      throw error;
    }
  }

  async findAll() {
    const model = await this._prisma.country.findMany({
      orderBy: { id: 'asc' },
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return model;
  }

  async findAllPercentage(queryDto: QueryDTO) {
    const page = +queryDto.page || 1;
    const limit = +queryDto.limit || 25;
    const skip = (page - 1) * limit;
    const count = await this._prisma.country.count();

    const model = await this._prisma.country.findMany({
      orderBy: { createdAt: 'asc' },
      skip,
      take: limit,
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return { data: model, count };
  }

  async findOne(id: string) {
    const model = await this._prisma.country.findUnique({ where: { id } });
    if (!model) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return model;
  }

  async update(id: string, dto: CountryDto) {
    const modelExist = await this._prisma.country.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const model = await this._prisma.country.update({
      where: { id },
      data: dto,
    });
    return model;
  }

  async remove(id: string) {
    const modelExist = await this._prisma.country.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const model = await this._prisma.country.delete({
      where: { id },
    });
    
    return model
  }
}
