import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
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
  providers: [
    ClientService,
    RtStrategy,
    AtStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
  controllers: [ClientController],
  imports: [PrismaModule, JwtModule.register({}), BaseModule],
})
export class ClientModule {}
