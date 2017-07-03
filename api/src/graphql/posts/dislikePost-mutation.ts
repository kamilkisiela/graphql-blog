import { publish } from './postLike-sub';

export const schema = `
  type Mutation {
    dislikePost(id: Int!): Post
  }
`;

export const resolver = {
  Mutation: {
    dislikePost(root, args, context) {
      const result = context.posts.dislike(args.id);

      result.then(post => {
        publish(post, 'DISLIKE');
      });

      return result;
    }
  }
};
