import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RoutesDto } from './dto/routes.dto';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { QueryDTO } from 'src/_query';
import { ImageService } from '../image/image.service';

@Injectable()
export class RoutesService {
  constructor(private _prisma: PrismaService, private _image: ImageService) {}

  async create(dto: RoutesDto) {
    try {
      const model = await this._prisma.routes.create({ data: dto });
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
    const model = await this._prisma.routes.findMany({
      orderBy: { id: 'asc' },
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return model;
  }

  async findAllPercentage(queryDto: QueryDTO) {
    const page = +queryDto.page || 1;
    const limit = +queryDto.limit || 25;
    const skip = (page - 1) * limit;
    const count = await this._prisma.routes.count();

    const model = await this._prisma.routes.findMany({
      where: {
        package_id: queryDto.id
      },
      orderBy: { createdAt: 'asc' },
      skip,
      take: limit,
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);
 
    return { data: model, count };
  }

  async findOne(id: string) {
    const model = await this._prisma.routes.findUnique({ where: { id } });
    if (!model) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return model;
  }

  async update(id: string, dto: RoutesDto) {
    const modelExist = await this._prisma.routes.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const model = await this._prisma.routes.update({
      where: { id },
      data: dto,
    });
    return model;
  }

  async remove(id: string) {
    const modelExist = await this._prisma.routes.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const model = await this._prisma.routes.delete({
      where: { id },
    });
    
    return model
  }
}
