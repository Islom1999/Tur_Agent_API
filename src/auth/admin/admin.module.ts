import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import {
  AtStrategy,
  FacebookStrategy,
  GoogleStrategy,
  RtStrategy,
} from '../strategies';
import { PrismaModule } from 'src/prisma';
import { JwtModule } from '@nestjs/jwt';
import { BaseModule } from 'src/base/module/baseModule';

@Module({
  providers: [AdminService, RtStrategy, AtStrategy],
  controllers: [AdminController],
  imports: [PrismaModule, JwtModule.register({})],
})
export class AdminModule {}
