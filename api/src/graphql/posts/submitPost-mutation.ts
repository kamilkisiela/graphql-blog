export const schema = `
  type Mutation {
    submitPost(title: String!, text: String!, author: String!): Post
  }
`;

export const resolver = {
  Mutation: {
    submitPost(root, args, context) {
      return context.posts.submit({
        title: args.title,
        text: args.text,
        author: args.author
      });
    }
  }
};
