import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { HighlightController } from './highlight.controller';
import { HighlightService } from './highlight.service';
import { ImageService } from '../image/image.service';


@Module({
  controllers: [HighlightController],
  providers: [HighlightService, ImageService],
  imports: [PrismaModule],
})
export class HighlightModule {}
