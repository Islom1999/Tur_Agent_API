import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { ImageService } from '../image/image.service';


@Module({
  controllers: [RegionController],
  providers: [RegionService, ImageService],
  imports: [PrismaModule],
})
export class RegionModule {}
