import { Injectable, Logger } from '@nestjs/common';
import { ExtendedPrismaClient, RawPrismaClient } from './extend-prisma.client';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends ExtendedPrismaClient {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
    this.logger.log(`Prisma v${Prisma.prismaVersion.client} initialized`);
  }
}

@Injectable()
export class RawPrismaService extends RawPrismaClient {
  private readonly logger = new Logger(RawPrismaService.name);

  constructor() {
    super();
    this.logger.log(`Raw Prisma v${Prisma.prismaVersion.client} initialized`);
  }
}
