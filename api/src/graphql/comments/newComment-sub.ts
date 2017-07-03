import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../subscriptions';
import { Comment } from '../../db/Comments';

export const NEW_COMMENT = 'NEW_COMMENT';

export function publish(comment: Comment) {
  pubsub.publish(NEW_COMMENT, { comment });
}

export const schema = `
  type Subscription {
    newComment(postId: Int!): Comment
  }
`;

export const resolver = {
  Subscription: {
    newComment: {
      resolve(payload) {
        return payload.comment;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_COMMENT),
        (payload, args) => payload.comment.post === args.postId
      )
    }
  }
};
