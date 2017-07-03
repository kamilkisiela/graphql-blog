import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import graphqlServer from './graphql/server';
import { addFixtures } from './db/fixtures';

import './db/integrations';

export function run(env: NodeJS.ProcessEnv) {
  const PORT = 3000;
  const HOST = typeof env.HOST !== 'undefined' ? env.HOST : '0.0.0.0';

  const api = express();

  api.use(cors());
  // for parsing application/json
  api.use(bodyParser.json());
  // for parsing application/x-www-form-urlencoded
  api.use(bodyParser.urlencoded({ extended: true }));

  // GraphQL
  const g = graphqlServer(api);

  g.attach();

  addFixtures()
    .then(() => {
      const server = api.listen(PORT, () => {
        console.log(`API runs on http://${HOST}:${PORT}`);
      });

      g.attachSubscriptions(server);
    })
    .catch(e => {
      console.error(e);
      throw new Error('Something went wrong!');
    });
}
