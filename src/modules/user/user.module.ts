import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma';
import { AdminService } from 'src/auth/admin/admin.service';
import { AtStrategy, RtStrategy } from 'src/auth/strategies';
import { JwtModule } from '@nestjs/jwt';
import { BaseModule } from 'src/base/module/baseModule';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, AdminService, RtStrategy, AtStrategy],
  imports: [
    PrismaModule,
    JwtModule.register({}),
    BaseModule,
    AuthModule
  ],
})
export class UserModule {}
