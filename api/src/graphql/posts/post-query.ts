export const schema = `
  type Query {
    post(id: Int!): Post
  }
`;

export const resolver = {
  Query: {
    post(root, args, context) {
      return context.posts.findOne(args.id);
    }
  }
};
