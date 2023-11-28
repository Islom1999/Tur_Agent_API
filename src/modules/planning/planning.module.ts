import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { ImageService } from '../image/image.service';


@Module({
  controllers: [PlanningController],
  providers: [PlanningService, ImageService],
  imports: [PrismaModule],
})
export class PlanningModule {}
