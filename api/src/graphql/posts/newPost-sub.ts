import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../subscriptions';
import { Post } from '../../db/Posts';

export const NEW_POST = 'NEW_POST';

export function publish(post: Post) {
  pubsub.publish(NEW_POST, { post });
}

export const schema = `
  type Subscription {
    newPost: Post
  }
`;

export const resolver = {
  Subscription: {
    newPost: {
      resolve(payload) {
        return payload.post;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_POST),
        (payload, args) => typeof payload.post.id !== 'undefined'
      )
    }
  }
};
