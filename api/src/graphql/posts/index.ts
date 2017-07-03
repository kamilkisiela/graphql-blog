import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import * as PostType from './Post-type';
import * as postsQuery from './posts-query';
import * as postQuery from './post-query';
import * as submitPostMutation from './submitPost-mutation';
import * as likePostMutation from './likePost-mutation';
import * as dislikePostMutation from './dislikePost-mutation';
import * as postLikeSub from './postLike-sub';
import * as newPostSub from './newPost-sub';

export const schema = mergeTypes([
  PostType.schema,
  postsQuery.schema,
  postQuery.schema,
  submitPostMutation.schema,
  likePostMutation.schema,
  dislikePostMutation.schema,
  postLikeSub.schema,
  newPostSub.schema
]);

export const resolvers = mergeResolvers([
  PostType.resolver,
  postsQuery.resolver,
  postQuery.resolver,
  submitPostMutation.resolver,
  likePostMutation.resolver,
  dislikePostMutation.resolver,
  postLikeSub.resolver,
  newPostSub.resolver
]);
