import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { ImageService } from '../image/image.service';


@Module({
  controllers: [PartnerController],
  providers: [PartnerService, ImageService],
  imports: [PrismaModule],
})
export class PartnerModule {}
