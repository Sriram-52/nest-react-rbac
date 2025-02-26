import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RolePermissionRoleIdPermissionIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  roleId: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  permissionId: string;
}

@ApiExtraModels(RolePermissionRoleIdPermissionIdUniqueInputDto)
export class ConnectRolePermissionDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: RolePermissionRoleIdPermissionIdUniqueInputDto,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RolePermissionRoleIdPermissionIdUniqueInputDto)
  roleId_permissionId?: RolePermissionRoleIdPermissionIdUniqueInputDto;
}
