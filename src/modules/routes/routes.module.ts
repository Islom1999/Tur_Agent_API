import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { ImageService } from '../image/image.service';


@Module({
  controllers: [RoutesController],
  providers: [RoutesService, ImageService],
  imports: [PrismaModule],
})
export class RoutesModule {}
