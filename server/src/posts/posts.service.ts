import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto, PostDto, PrismaService, UpdatePostDto } from '@/prisma';
import { plainToInstance } from 'class-transformer';
import { ClsService } from 'nestjs-cls';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';

@Injectable()
export class PostsService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prisma: PrismaService,
    private readonly clsService: ClsService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { authorId, ...rest } = createPostDto;
    const post = await this.prisma.post.create({
      data: {
        ...rest,
        author: { connect: { id: authorId } },
        tenant: { connect: { id: this.clsService.get('tenantId') } },
      },
    });
    return plainToInstance(PostDto, post);
  }

  async findAll() {
    const posts = await this.prisma.post.findMany();
    return plainToInstance(PostDto, posts);
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    return plainToInstance(PostDto, post);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    return plainToInstance(PostDto, post);
  }

  async remove(id: string) {
    await this.prisma.post.delete({
      where: { id },
    });
  }
}
