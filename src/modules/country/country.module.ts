import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { SharedModule } from 'src/common/filter/sharedModule';
import {CountryController} from './country.controller'
import {CountryService} from './country.service'

@Module({
  controllers: [CountryController],
  providers: [CountryService],
  imports: [PrismaModule],
})
export class CountryModule {}
