import { ApiProperty } from '@nestjs/swagger';
import { Tenant } from './tenant.entity';
import { User } from './user.entity';

export class Post {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  createdBy: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  updatedBy: string | null;
  @ApiProperty({
    type: () => Tenant,
    required: false,
  })
  tenant?: Tenant;
  @ApiProperty({
    type: 'string',
  })
  tenantId: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'boolean',
  })
  published: boolean;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  author?: User;
  @ApiProperty({
    type: 'string',
  })
  authorId: string;
}
