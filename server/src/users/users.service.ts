import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto, UserDto } from '@/prisma/models';
import { PrismaService, RawPrismaService } from '@/prisma/prisma.service';
import { auth } from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rawPrisma: RawPrismaService,
  ) {}

  private async isEmailTaken(email: string) {
    try {
      await auth().getUserByEmail(email);
      return true;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return false;
      }
      throw new BadRequestException(
        error instanceof Error ? error.message : error,
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    const isEmailTaken = await this.isEmailTaken(createUserDto.email);
    if (isEmailTaken) {
      throw new BadRequestException('Email is already taken');
    }
    const fbUser = await auth().createUser({
      email: createUserDto.email,
      password: createUserDto.password,
      displayName: createUserDto.name,
    });
    const user = await this.rawPrisma.user.create({
      data: {
        id: fbUser.uid,
        email: createUserDto.email,
        name: createUserDto.name,
      },
    });
    return plainToInstance(UserDto, user);
  }

  async findAll() {
    const result = await this.prisma.tenantUser
      .findMany({ include: { user: true } })
      .then((tenantUser) => tenantUser.map((tu) => tu.user));

    return plainToInstance(UserDto, result);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(UserDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return plainToInstance(UserDto, user);
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
