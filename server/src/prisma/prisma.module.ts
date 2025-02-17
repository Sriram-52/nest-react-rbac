import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ZenStackModule } from '@zenstackhq/server/nestjs';
import { ClsService } from 'nestjs-cls';
import { enhance } from '@zenstackhq/runtime';

@Module({
  imports: [
    ZenStackModule.registerAsync({
      useFactory: (prisma: PrismaService, cls: ClsService) => {
        return {
          getEnhancedPrisma: () => enhance(prisma, { user: cls.get('auth') }),
        };
      },
      inject: [PrismaService, ClsService],
      extraProviders: [PrismaService],
      global: true,
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
