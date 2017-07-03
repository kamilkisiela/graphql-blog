export const schema = `
  type Query {
    comments(postId: Int!): [Comment]
  }
`;

export const resolver = {
  Query: {
    comments(root, args, context) {
      return context.comments.findAllByPost(args.postId);
    }
  }
};
