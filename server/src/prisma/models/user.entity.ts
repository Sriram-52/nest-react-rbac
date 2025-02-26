import { ApiProperty } from '@nestjs/swagger';
import { TenantUser } from './tenantUser.entity';
import { RoleUser } from './roleUser.entity';

export class User {
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
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: () => TenantUser,
    isArray: true,
    required: false,
  })
  tenants?: TenantUser[];
  @ApiProperty({
    type: () => RoleUser,
    isArray: true,
    required: false,
  })
  roles?: RoleUser[];
}
