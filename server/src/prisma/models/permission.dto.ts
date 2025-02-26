import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
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
  action: string;
  @ApiProperty({
    type: 'string',
  })
  subject: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  fields: string[];
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  conditions: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'boolean',
  })
  inverted: boolean;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  reason: string | null;
}
