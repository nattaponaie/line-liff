import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';

import {
 SERVER_ENDPOINT_HOST, SERVER_ENDPOINT_PORT, SERVER_ENDPOINT_SCHEME, SERVER_OPEN_SWAGGER,
} from '/server-config';

import { description } from '../../package.json';
import asyncWrapper from './middleware/async-wrapper';
// import { logInfo } from 'util/logger';

export default ({ version, routes }) => {
  const router = express.Router();
  router.use(routes);
  // logInfo(`Initialize API v${version} routes`, { endpoint: `${server.endpoint.scheme}://${server.endpoint.host}:${server.endpoint.port}/api/v${version}` });

  let apiSpec = null;
  if (SERVER_OPEN_SWAGGER) { // Generate swagger document in json format
    apiSpec = swaggerJsDoc({
      swaggerDefinition: {
        info: {
          title: description,
          version,
        },
        schemes: [SERVER_ENDPOINT_SCHEME],
        host: `${SERVER_ENDPOINT_HOST}:${SERVER_ENDPOINT_PORT}`,
        basePath: `/api/v${version}`,
      },
      apis: [
        `./server/api/v${version}/controllers/*.js`, // API specs
      ],
    });
    router.use('/spec', asyncWrapper((req, res) => res.json(apiSpec)));
    // logInfo(`Initialize API v${version} swagger JSON specification`, { endpoint: `${server.endpoint.scheme}://${server.endpoint.host}:${server.endpoint.port}/api/v${version}/spec` });
  }

  return {
    router,
    apiSpec,
    version,
  };
};
