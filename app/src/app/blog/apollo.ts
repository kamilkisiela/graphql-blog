import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
  reconnect: true,
});

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  addTypename: false
});

export function provideClient(): ApolloClient {
  return client;
}
