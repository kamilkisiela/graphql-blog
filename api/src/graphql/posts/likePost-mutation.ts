import { publish } from './postLike-sub';

export const schema = `
  type Mutation {
    likePost(id: Int!): Post
  }
`;

export const resolver = {
  Mutation: {
    likePost(root, args, context) {
      const result = context.posts.like(args.id);

      result.then(post => {
        publish(post, 'LIKE');
      });

      return result;
    }
  }
};
