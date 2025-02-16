import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma';
import { HealthController } from './controllers/health.controller';
import { AuthService } from './services';

@Module({
  imports: [PrismaModule],
  controllers: [HealthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class CommonModule {}
