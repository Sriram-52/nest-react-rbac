import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

export class RolePermission {
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
    type: () => Role,
    required: false,
  })
  role?: Role;
  @ApiProperty({
    type: 'string',
  })
  roleId: string;
  @ApiProperty({
    type: () => Permission,
    required: false,
  })
  permission?: Permission;
  @ApiProperty({
    type: 'string',
  })
  permissionId: string;
}
