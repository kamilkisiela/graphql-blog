import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../subscriptions';
import { Post } from '../../db/Posts';

export const POST_LIKE = 'POST_LIKE';

export type LIKE_ACTION = 'LIKE' | 'DISLIKE';

export function publish(post: Post, action: LIKE_ACTION) {
  pubsub.publish(POST_LIKE, { post, action });
}

export const schema = `
  enum LikeAction {
    LIKE
    DISLIKE
  }
  
  type PostWithLike {
    post: Post
    action: LikeAction
  }

  type Subscription {
    postLike(id: Int!): PostWithLike
  }
`;

export const resolver = {
  Subscription: {
    postLike: {
      resolve(payload) {
        return {
          post: payload.post,
          action: payload.action
        };
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(POST_LIKE),
        (payload, args) => payload.post.id === args.id
      )
    }
  }
};
