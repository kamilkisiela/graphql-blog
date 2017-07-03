export const schema = `
  type Mutation {
    submitComment(postId: Int!, text: String!, author: String!): Comment
  }
`;

export const resolver = {
  Mutation: {
    submitComment(root, args, context) {
      return context.comments.submit({
        postId: args.postId,
        text: args.text,
        author: args.author
      });
    }
  }
};
