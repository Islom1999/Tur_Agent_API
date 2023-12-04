import { Module } from '@nestjs/common';
import { BilingService } from './billing.service';
import { BilingController } from './billing.controller';
import { PrismaModule } from 'src/prisma';
import { SharedModule } from 'src/common/filter/sharedModule';

@Module({
  controllers: [BilingController],
  providers: [BilingService],
  imports: [
    PrismaModule, 
    SharedModule,
  ],
})
export class BilingModule {}
