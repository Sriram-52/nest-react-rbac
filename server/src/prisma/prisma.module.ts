import { Module } from '@nestjs/common';
import { PrismaService, RawPrismaService } from './prisma.service';

@Module({
  imports: [],
  providers: [PrismaService, RawPrismaService],
  exports: [PrismaService, RawPrismaService],
})
export class PrismaModule {}
