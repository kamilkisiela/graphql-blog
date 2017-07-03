import { Base } from './Base';
import { posts } from './Posts';

export interface Comment {
  id: number;
  text: string;
  author: string;
  post: number;
}

export interface CommentInput {
  postId: number;
  text: string;
  author: string;
}

export class Comments extends Base<Comment> {
  public findAllByPost(postId: number): Promise<Comment[]> {
    return Promise.resolve(
      this.data.filter(c => c.post === postId)
    );
  }

  public submit(input: CommentInput): Promise<Comment> {
    if (typeof input.text === 'undefined') {
      throw new Error('You must provide a text');
    }
    if (typeof input.author === 'undefined') {
      throw new Error('You must provide an author');
    }
    if (!posts.findOne(input.postId)) {
      throw new Error('Post does not exist');
    }

    const id = this.generateID();
    const newComment: Comment = {
      id,
      text: input.text,
      author: input.author,
      post: input.postId
    };

    this.events.emit('submit', newComment);
    
    this.data.push(newComment);

    return Promise.resolve(newComment);
  }
}

export const comments = new Comments;
