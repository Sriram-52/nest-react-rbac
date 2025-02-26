import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ClsModule } from 'nestjs-cls';
import { PrismaModule } from '@/prisma';
import { PostsAbilityService } from './posts-ability.service';

@Module({
  imports: [ClsModule, PrismaModule],
  controllers: [PostsController],
  providers: [PostsService, PostsAbilityService],
})
export class PostsModule {}
