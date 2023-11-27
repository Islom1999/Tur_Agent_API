import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma';
import {
  AtStrategy,
  RtStrategy,
} from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { BaseModule } from 'src/base/module/baseModule';

@Module({
  providers: [
    AuthService,
    RtStrategy,
    AtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    JwtModule.register({}),
    BaseModule,
  ],
  exports: [],
})
export class AuthModule {}
