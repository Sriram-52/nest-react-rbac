import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({ log: ['info'] });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to Database');
  }
}
