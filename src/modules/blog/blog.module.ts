import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { SharedModule } from 'src/common/filter/sharedModule';
import {BlogController} from './blog.controller'
import {BlogService} from './blog.service'

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [PrismaModule],
})
export class BlogModule {}
