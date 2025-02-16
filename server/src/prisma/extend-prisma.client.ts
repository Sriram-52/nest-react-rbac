import { INestApplication, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import { ClsServiceManager } from 'nestjs-cls';

const prisma = new PrismaClient({ log: ['info'] });
const logger = new Logger('PrismaService');

const nestExtension = Prisma.defineExtension({
  name: 'nest',
  client: {
    //connect to database on startup
    async onModuleInit() {
      await prisma
        .$connect()
        .then(() => {
          logger.verbose('Connected to Database');
        })
        .catch((error: Error) => {
          logger.error(error);
        });
    },
    // disconnect database on shutdown
    enableShutdownHooks(app: INestApplication) {
      process.on('beforeExit', () => {
        app
          .close()
          .then(() => {
            logger.verbose('Database Disconnected successfully');
          })
          .catch((error: Error) => {
            logger.error(error);
          });
      });
    },
  },
});

function extendPrismaClient() {
  const cls = ClsServiceManager.getClsService();
  const extendedPrisma = enhance(
    prisma,
    { user: cls.get('auth') },
    { logPrismaQuery: true },
  );

  return extendedPrisma.$extends(nestExtension);
}

export const ExtendedPrismaClient = class {
  constructor() {
    return extendPrismaClient();
  }
} as new () => ReturnType<typeof extendPrismaClient>;

function rawPrismaClient() {
  return prisma.$extends(nestExtension);
}

export const RawPrismaClient = class {
  constructor() {
    return rawPrismaClient();
  }
} as new () => ReturnType<typeof rawPrismaClient>;
