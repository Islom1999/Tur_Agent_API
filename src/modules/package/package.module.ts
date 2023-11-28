import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { ImageService } from '../image/image.service';


@Module({
  controllers: [PackageController],
  providers: [PackageService, ImageService],
  imports: [PrismaModule],
})
export class PackageModule {}
