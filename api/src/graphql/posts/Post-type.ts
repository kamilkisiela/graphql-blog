import { comments } from '../../db/Comments';

export const schema = `
  type Post {
    id: Int
    title: String
    text: String
    author: String
    comments: [Comment]
    likes: Int
  }
`;

export const resolver = {
  Post: {
    comments(root) {
      return comments.findAllByPost(root.id);
    }
  }
};
