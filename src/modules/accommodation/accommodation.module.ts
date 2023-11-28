import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { AccommodationController } from './accommodation.controller';
import { AccommodationService } from './accommodation.service';
import { ImageService } from '../image/image.service';


@Module({
  controllers: [AccommodationController],
  providers: [AccommodationService, ImageService],
  imports: [PrismaModule],
})
export class AccommodationModule {}
