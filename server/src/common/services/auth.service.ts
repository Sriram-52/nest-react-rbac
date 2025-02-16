import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async validateToken(token: string, tenantId: string) {
    try {
      const decodedToken = await auth().verifyIdToken(token);
      const user = await this.prisma.user.findUnique({
        where: {
          email: decodedToken.email,
          tenants: {
            some: { id: tenantId },
          },
        },
      });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
