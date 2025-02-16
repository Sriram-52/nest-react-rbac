import { CreateUserDto as Base } from '@/prisma/models';
import { IsString } from 'class-validator';

export class CreateUserDto extends Base {
  @IsString()
  password: string;
}
