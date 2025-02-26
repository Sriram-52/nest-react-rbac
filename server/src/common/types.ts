import { User } from '@prisma/client';
import { AppAbility } from './casl';

declare module 'express' {
  interface Request {
    user?: User;
    userAbility?: AppAbility;
  }
}

declare module 'nestjs-cls' {
  interface ClsStore {
    auth: User;
    ability: AppAbility;
    tenantId: string;
  }
}
