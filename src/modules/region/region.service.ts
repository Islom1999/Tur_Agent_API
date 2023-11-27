import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RegionDto } from './dto/region.dto';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { QueryDTO } from 'src/_query';
import { ImageService } from '../image/image.service';

@Injectable()
export class RegionService {
  constructor(private _prisma: PrismaService, private _image: ImageService) {}

  async create(dto: RegionDto) {
    try {
      const model = await this._prisma.region.create({ data: dto });
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
    const model = await this._prisma.region.findMany({
      orderBy: { id: 'asc' },
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return model;
  }

  async findAllPercentage(queryDto: QueryDTO) {
    const page = +queryDto.page || 1;
    const limit = +queryDto.limit || 25;
    const skip = (page - 1) * limit;
    const count = await this._prisma.region.count();

    const model = await this._prisma.region.findMany({
      orderBy: { createdAt: 'asc' },
      skip,
      take: limit,
    });

    if (!model[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);
 
    return { data: model, count };
  }

  async findOne(id: string) {
    const model = await this._prisma.region.findUnique({ where: { id } });
    if (!model) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return model;
  }

  async update(id: string, dto: RegionDto) {
    const modelExist = await this._prisma.region.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const _images = dto.images ?? [];
    const productImages = modelExist.images;

    productImages.forEach((imageName) => {
      if (!_images.includes(imageName)) {
        this._image.deleteImage(imageName);
      }
    });

    await this._image.changeImagesUsed(_images);

    const model = await this._prisma.region.update({
      where: { id },
      data: dto,
    });
    return model;
  }

  async remove(id: string) {
    const modelExist = await this._prisma.region.findUnique({ where: { id}})
    if(!modelExist) throw new HttpException('not fount model', HttpStatus.NOT_FOUND)

    const model = await this._prisma.region.delete({
      where: { id },
    });

    if (model.images) {
      await this._image.deleteImages(model.images);
    }
    
    return model
  }
}
