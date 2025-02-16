import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ClsModule } from 'nestjs-cls';
import { PrismaModule } from '@/prisma';

@Module({
  imports: [ClsModule, PrismaModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
