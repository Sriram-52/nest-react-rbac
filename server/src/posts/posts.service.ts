import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePostDto,
  Post,
  PostDto,
  PrismaService,
  UpdatePostDto,
} from '@/prisma';
import { plainToInstance } from 'class-transformer';
import { ClsService } from 'nestjs-cls';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { accessibleBy } from '@casl/prisma';
import { PostsAbilityService } from './posts-ability.service';

@Injectable()
export class PostsService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prisma: PrismaService,
    private readonly clsService: ClsService,
    private readonly ability: PostsAbilityService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { authorId, ...rest } = createPostDto;
    const tenantId = this.clsService.get('tenantId');

    this.ability.canCreate(createPostDto);

    const post = await this.prisma.post.create({
      data: {
        ...rest,
        author: { connect: { id: authorId } },
        tenant: { connect: { id: tenantId } },
      },
    });
    return plainToInstance(PostDto, post);
  }

  async findAll() {
    const posts = await this.prisma.post.findMany({
      where: accessibleBy(this.clsService.get('ability')).Post,
      include: { author: true },
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    });
    return plainToInstance(Post, posts);
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    this.ability.canRead(post);

    return plainToInstance(PostDto, post);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    this.ability.canUpdate(updatePostDto);

    const result = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    return plainToInstance(PostDto, result);
  }

  async remove(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    this.ability.canDelete(post);

    await this.prisma.post.delete({
      where: { id },
    });
  }
}
