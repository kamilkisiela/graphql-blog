export const schema = `
  type Query {
    posts: [Post]
  }
`;

export const resolver = {
  Query: {
    posts(root, args, context) {
      return context.posts.findAll();
    }
  }
};
