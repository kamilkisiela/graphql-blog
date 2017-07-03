import { comments, Comment } from './Comments';
import { posts, Post } from './Posts';

interface PostFixture extends Post {
  comments?: Comment[];
}

const fixtures: PostFixture[] = [];

fixtures.push({
  id: null,
  title: 'Introducing Explore GraphQL',
  text: `It’s no secret that the Apollo community thinks GraphQL is the best thing to happen to development since sliced bread. We talk to new teams every week who have gotten huge improvements in their workflow and development speed by adopting GraphQL as their new API layer. So we wanted to create a new resource that can help communicate that excitement and give people the tools to get GraphQL running in production at their organization.`,
  author: 'Sashko Stubailo',
  likes: 10,
  comments: [{
    id: null,
    text: 'Amazing!',
    author: 'Kamil Kisiela',
    post: null
  }]
});

fixtures.push({
  id: null,
  title: 'GraphQL vs. REST',
  text: `Often, GraphQL is presented as a revolutionary new way to think about APIs. Instead of working with rigid server-defined endpoints, you can send queries to get exactly the data you’re looking for in one request. And it’s true — GraphQL can be transformative when adopted in an organization, enabling frontend and backend teams to collaborate more smoothly than ever before. But in practice, both of these technologies involve sending an HTTP request and receiving some result, and GraphQL has many elements of the REST model built in.`,
  author: 'Sashko Stubailo',
  likes: 5
});

fixtures.push({
  id: null,
  title: 'GraphQL Just Got A Whole Lot “Prettier”!',
  text: `We’ve all seen the prettier hype train (and a lot of us are on it!) and while it began as an opinionated code formatter for JavaScript, it has quickly grown to take on other languages like Flow, Typescript, and CSS. As of prettier@v1.5.0, it now supports one of my favorites, GraphQL!`,
  author: 'Jon Wong',
  likes: 12
});

fixtures.push({
  id: null,
  title: 'Building React Apps with GraphQL, Graphcool & Apollo',
  text: `It’s been less than two years since Facebook first open-sourced GraphQL as a new way of exposing data from an API. In that short period, it’s already revolutionized the API space and many major companies, like GitHub, Twitter and Yelp, have started using it in production.`,
  author: 'Graphcool',
  likes: 8
});

export function addFixtures(): Promise<null> {
  console.log('Load fixture data');
  
  return Promise.all(fixtures.map(post => {
    // submit a post
    return posts.submit({
      title: post.title,
      text: post.text,
      author: post.author,
      likes: post.likes
    }).then(p => {
      // submit comments for a post
      if (post.comments) {
        return Promise.all(
          post.comments.map(
            c => comments.submit({
              text: c.text,
              author: c.author,
              postId: p.id
            })
          )
        ).then(() => null);
      }

      return Promise.resolve(null);
    });
  })).then(() => null);
}
