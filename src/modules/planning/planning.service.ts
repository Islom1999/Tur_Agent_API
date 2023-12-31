import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PlanningDto } from './dto/planning.dto';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { QueryDTO } from 'src/_query';
import { ImageService } from '../image/image.service';

@Injectable()
export class PlanningService {
  constructor(private _prisma: PrismaService, private _image: ImageService) {}

  async create(dto: PlanningDto) {
    try {
      const model = await this._prisma.planning.create({ data: dto });
      if (model && model.images) {
        await this._image.changeImagesUsed(model.images);
      }
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
    const model = await this._prisma.planning.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        country:{select :{
          id: true,
          name_en: true,
          name_ru: true,
          name_ne: true,
          name_id: true
        }}
      }
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return model;
  }

  async findAllPercentage(queryDto: QueryDTO) {
    const page = +queryDto.page || 1;
    const limit = +queryDto.limit || 25;
    const skip = (page - 1) * limit;
    const count = await this._prisma.planning.count({
      where: {
        country_id: queryDto?.id
      },
    });

    const model = await this._prisma.planning.findMany({
      orderBy: { createdAt: 'asc' },
      where: {
        country_id: queryDto?.id
      },
      skip,
      take: limit,
      include: {
        country:{select :{
          id: true,
          name_en: true,
          name_ru: true,
          name_ne: true,
          name_id: true
        }}
      }
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);
 
    return { data: model, count };
  }

  async findOne(id: string) {
    const model = await this._prisma.planning.findUnique({ 
      where: { id }, 
      include: {
        country:{select :{
          id: true,
          name_en: true,
          name_ru: true,
          name_ne: true,
          name_id: true
        }}
      }
    });
    if (!model) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return model;
  }

  async update(id: string, dto: PlanningDto) {
    const modelExist = await this._prisma.planning.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const _images = dto.images ?? [];
    const productImages = modelExist.images;

    productImages.forEach((imageName) => {
      if (!_images.includes(imageName)) {
        this._image.deleteImage(imageName);
      }
    });

    await this._image.changeImagesUsed(_images);

    const model = await this._prisma.planning.update({
      where: { id },
      data: dto,
    });
    return model;
  }

  async remove(id: string) {
    const modelExist = await this._prisma.planning.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const model = await this._prisma.planning.delete({
      where: { id },
    });

    if (model.images) {
      await this._image.deleteImages(model.images);
    }
    
    return model
  }
}
