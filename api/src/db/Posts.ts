import { Base } from './Base';

export interface Post {
  id: number;
  title: string;
  text: string;
  author: string;
  likes: number;
}

export interface PostInput {
  title: string;
  text: string;
  author: string;
  likes: number;
}

export class Posts extends Base<Post> {
  public submit(input: PostInput): Promise<Post> {
    if (typeof input.text === 'undefined') {
      throw new Error('You must provide a text');
    }
    if (typeof input.author === 'undefined') {
      throw new Error('You must provide an author');
    }
    if (typeof input.title === 'undefined') {
      throw new Error('You must provide a title');
    }

    const id = this.generateID();
    const newPost: Post = {
      id,
      title: input.title,
      text: input.text,
      author: input.author,
      likes: input.likes || 0
    };

    this.events.emit('submit', newPost);
    
    this.data.push(newPost);

    return Promise.resolve(newPost);
  }

  public like(id: number): Promise<Post> {
    return this.changeLike(id, true);
  }

  public dislike(id: number): Promise<Post> {
    return this.changeLike(id, false);
  }

  private changeLike(id: number, like: boolean): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.findOne(id).then((post) => {
        if (typeof post === 'undefined') {
          reject('Post does not exist');
        } else {
          if (like === true) {
            this.events.emit('like', post);
            post.likes++;
          }
          else if(post.likes > 1) {
            this.events.emit('dislike', post);
            post.likes--;
          }

          resolve(post);
        }
      });
    });
  }
}

export const posts = new Posts;
