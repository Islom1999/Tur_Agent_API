import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma';
import { AuthService } from 'src/auth/auth.service';
import { AtStrategy, RtStrategy } from 'src/auth/strategies';
import { JwtModule } from '@nestjs/jwt';
import { BaseModule } from 'src/base/module/baseModule';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, RtStrategy, AtStrategy],
  imports: [
    PrismaModule,
    JwtModule.register({}),
    BaseModule,
    AuthModule
  ],
})
export class UserModule {}
