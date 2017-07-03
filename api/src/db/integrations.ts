// DB
import { posts } from './Posts';
import { comments } from './Comments';

// GraphQL
import { publish as publishNewPost } from '../graphql/posts/newPost-sub';
import { publish as publishPostLike } from '../graphql/posts/postLike-sub';
import { publish as publishNewComment } from '../graphql/comments/newComment-sub';

posts.events.on('submit', (post) => {
  console.log(`Post #${post.id} has been submitted`);
  publishNewPost(post);
});

posts.events.on('like', (post) => {
  console.log(`Post #${post.id} has been liked`);
  publishPostLike(post, 'LIKE');
});

posts.events.on('dislike', (post) => {
  console.log(`Post #${post.id} has been disliked`);
  publishPostLike(post, 'DISLIKE');
});

comments.events.on('submit', (comment) => {
  console.log(`Comment #${comment.id} to Post #${comment.post} has been submitted`);
  publishNewComment(comment);
});
