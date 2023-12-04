import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import {
  AtStrategy,
  FacebookStrategy,
  RtStrategy,
  GoogleStrategy,
} from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { BaseModule } from 'src/base/module/baseModule';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';

@Module({
  providers: [
    RtStrategy,
    AtStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
  controllers: [],
  imports: [
    PrismaModule,
    JwtModule.register({}),
    BaseModule,
    ClientModule,
    AdminModule,
  ],
  exports: [],
})
export class AuthModule {}
