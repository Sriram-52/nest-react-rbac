import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
  @ApiProperty({
    type: 'boolean',
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  authorId: string;
}
