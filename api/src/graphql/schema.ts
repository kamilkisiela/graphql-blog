import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import * as posts from './posts';
import * as comments from './comments';

const rootSchema = mergeTypes([
  posts.schema,
  comments.schema
]);
const rootResolvers = mergeResolvers([
  posts.resolvers,
  comments.resolvers
]);

export default makeExecutableSchema({
  typeDefs: [rootSchema],
  resolvers: rootResolvers
});
