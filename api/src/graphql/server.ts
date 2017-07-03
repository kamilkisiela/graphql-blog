import { Application } from 'express';
import { Server } from 'http';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import * as graphql from 'graphql';

import schema from './schema';
import provideContext from './context';

export default function(api: Application) {
  return {
    attach() {
      api.use('/graphql', graphqlExpress({
        schema,
        context: provideContext()
      }));

      api.use('/explore', graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: 'ws://localhost:3000/subscriptions'
      }));
    },
    
    attachSubscriptions(server: Server) {
      new SubscriptionServer({
        schema,
        execute: graphql.execute,
        subscribe: graphql['subscribe'],
      }, {
        path: '/subscriptions',
        server
      });
    }
  }
}
