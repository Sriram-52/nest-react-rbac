import { ApiProperty } from '@nestjs/swagger';
import { RolePermission } from './rolePermission.entity';
import { RoleUser } from './roleUser.entity';

export class Role {
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
  tenantId: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: () => RolePermission,
    isArray: true,
    required: false,
  })
  permissions?: RolePermission[];
  @ApiProperty({
    type: () => RoleUser,
    isArray: true,
    required: false,
  })
  users?: RoleUser[];
}
