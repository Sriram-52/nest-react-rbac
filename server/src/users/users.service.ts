import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto, User, UserDto } from '@/prisma/models';
import { PrismaService } from '@/prisma/prisma.service';
import { auth } from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { ClsService } from 'nestjs-cls';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { UsersAbilityService } from './users-ability.service';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class UsersService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prisma: PrismaService,
    private readonly rawPrisma: PrismaService,
    private readonly clsService: ClsService,
    private readonly ability: UsersAbilityService,
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
      .findMany({
        where: {
          user: accessibleBy(this.clsService.get('ability')).User,
        },
        include: { user: true },
      })
      .then((tenantUser) => tenantUser.map((tu) => tu.user));

    return plainToInstance(UserDto, result);
  }

  findMe() {
    return plainToInstance(User, this.clsService.get('auth'));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    this.ability.canRead(user);
    return plainToInstance(UserDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    this.ability.canUpdate(user);
    const result = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return plainToInstance(UserDto, result);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    this.ability.canDelete(user);
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
