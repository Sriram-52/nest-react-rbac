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
import { ApiSuccessResponse } from '@/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiSuccessResponse(PostDto, { status: 201 })
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const result = await this.postsService.create(createPostDto);
    return { message: 'Post created successfully', result };
  }

  @Get()
  indAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiSuccessResponse(PostDto)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const result = await this.postsService.update(id, updatePostDto);
    return { message: 'Post updated successfully', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
    return { message: 'Post deleted successfully' };
  }
}
