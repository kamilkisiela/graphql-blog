import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import * as CommentType from './Comment-type';
import * as commentsQuery from './comments-query';
import * as submitCommentMutation from './submitComment-mutation';
import * as newCommentSub from './newComment-sub';

export const schema = mergeTypes([
  CommentType.schema,
  commentsQuery.schema,
  submitCommentMutation.schema,
  newCommentSub.schema
]);

export const resolvers = mergeResolvers([
  CommentType.resolver,
  commentsQuery.resolver,
  submitCommentMutation.resolver,
  newCommentSub.resolver
]);
