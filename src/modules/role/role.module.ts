import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from 'src/prisma';
import { SharedModule } from 'src/common/filter/sharedModule';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [PrismaModule, SharedModule],
})
export class RoleModule {}
