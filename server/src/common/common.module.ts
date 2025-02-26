import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma';
import { HealthController } from './controllers/health.controller';
import { AuthService } from './services';
import { AbilityFactory } from './casl/casl-ability.factory';

@Module({
  imports: [PrismaModule],
  controllers: [HealthController],
  providers: [AuthService, AbilityFactory],
  exports: [AuthService, AbilityFactory],
})
export class CommonModule {}
