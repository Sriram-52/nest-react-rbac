import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto, User, UserDto } from '@/prisma/models';
import { PrismaService } from '@/prisma/prisma.service';
import { auth } from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { ClsService } from 'nestjs-cls';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prisma: PrismaService,
    private readonly rawPrisma: PrismaService,
    private readonly clsService: ClsService,
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
    try {
      const user = await this.rawPrisma.$transaction(
        async (tx) => {
          const user = await tx.user.create({
            data: {
              id: fbUser.uid,
              email: createUserDto.email,
              name: createUserDto.name,
            },
          });
          await tx.tenantUser.create({
            data: {
              tenantId: createUserDto.tenantId,
              userId: user.id,
            },
          });
          return user;
        },
        { timeout: 20000 },
      );
      return plainToInstance(UserDto, user);
    } catch (error) {
      await auth().deleteUser(fbUser.uid);
      throw error;
    }
  }

  async findAll() {
    const result = await this.prisma.tenantUser
      .findMany({ include: { user: true } })
      .then((tenantUser) => tenantUser.map((tu) => tu.user));

    return plainToInstance(UserDto, result);
  }

  async findMe() {
    const user = this.clsService.get<User>('auth');
    const result = await this.rawPrisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        tenants: true,
      },
    });
    return plainToInstance(User, result);
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
