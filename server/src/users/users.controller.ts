import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UserDto } from '@/prisma';
import { ApiSuccessResponse, CheckPermissions, IsPublic } from '@/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @ApiSuccessResponse(UserDto, { status: 201 })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return { message: 'User created successfully', result };
  }

  @CheckPermissions(['read', 'User'])
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @CheckPermissions(['read', 'User'])
  @Get('me')
  findMe() {
    return this.usersService.findMe();
  }

  @CheckPermissions(['read', 'User'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @CheckPermissions(['update', 'User'])
  @ApiSuccessResponse(UserDto)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(id, updateUserDto);
    return { message: 'User updated successfully', result };
  }

  @CheckPermissions(['delete', 'User'])
  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
