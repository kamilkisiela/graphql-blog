import { posts } from '../../db/Posts';

export const schema = `
  type Comment {
    id: Int
    text: String
    author: String
    post: Post
  }
`;

export const resolver = {
  Comment: {
    post(root) {
      return posts.findOne(root.post);
    }
  }
};

