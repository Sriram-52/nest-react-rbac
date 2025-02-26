import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, PostDto, UpdatePostDto } from '@/prisma/models';
import { ApiSuccessResponse, CheckPermissions } from '@/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiSuccessResponse(PostDto, { status: 201 })
  @CheckPermissions(['create', 'Post'])
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const result = await this.postsService.create(createPostDto);
    return { message: 'Post created successfully', result };
  }

  @CheckPermissions(['read', 'Post'])
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @CheckPermissions(['read', 'Post'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiSuccessResponse(PostDto)
  @CheckPermissions(['update', 'Post'])
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const result = await this.postsService.update(id, updatePostDto);
    return { message: 'Post updated successfully', result };
  }

  @CheckPermissions(['delete', 'Post'])
  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
    return { message: 'Post deleted successfully' };
  }
}
