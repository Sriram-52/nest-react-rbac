import { Action, defaultFieldsBeforeAbilityCheck, Subject } from '@/common';
import { CreatePostDto, UpdatePostDto } from '@/prisma';
import { ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class PostsAbilityService {
  constructor(private readonly clsService: ClsService) {}

  canCreate(payload: CreatePostDto) {
    const ability = this.clsService.get('ability');
    const sub: Post = {
      ...payload,
      ...defaultFieldsBeforeAbilityCheck,
      published: !!payload.published,
    };
    ForbiddenError.from(ability).throwUnlessCan('create', subject('Post', sub));
  }

  canRead(post: Post) {
    const ability = this.clsService.get('ability');
    ForbiddenError.from(ability).throwUnlessCan('read', subject('Post', post));
  }

  canUpdate(payload: UpdatePostDto) {
    const ability = this.clsService.get('ability');
    const sub = {
      ...payload,
      ...defaultFieldsBeforeAbilityCheck,
      published: !!payload.published,
    } as Post;
    ForbiddenError.from(ability).throwUnlessCan('update', subject('Post', sub));
  }

  canDelete(post: Post) {
    const ability = this.clsService.get('ability');
    ForbiddenError.from(ability).throwUnlessCan(
      'delete',
      subject('Post', post),
    );
  }
}
