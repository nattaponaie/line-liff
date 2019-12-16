import bodyParser from 'body-parser';
import express from 'express';
import nextjs from 'next';
import swaggerUi from 'swagger-ui-express';

import {
  logError, logInfo,
} from '../utils/logger';
import {
  defaultApi,supportApis,
} from './api';
import {
  NODE_ENV, PORT, SERVER_OPEN_SWAGGER,
} from './configs/server-config';
import models from './database/models';

const port = parseInt(PORT, 10) || 3000;
const dev = NODE_ENV === 'development';
const app = nextjs({ dev });
const handle = app.getRequestHandler();
const server = express();

app.prepare().then(async () => {
  // middleware
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // route
  server.use((req, _, next) => {
    req.app = app;
    next();
  });

  // Register API routes
  supportApis.forEach((api) => {
    server.use(`/api/v${api.version}`, api.router);
    // Setup swagger UI
    if (SERVER_OPEN_SWAGGER) {
      server.use(`/api/v${api.version}/docs`, swaggerUi.serve, swaggerUi.setup(defaultApi.apiSpec));
      // logInfo(`Initialize Swagger UI based on API v${defaultApi.version} specification`, { endpoint: `${server.endpoint.scheme}://${server.endpoint.host}:${server.endpoint.port}/api/v${api.version}/docs` });
    }
  });
  server.use('/api', defaultApi.router);

  server.get('static/*', (req, _, next) => {
    req.url = req.originalUrl.replace('/static', 'static');
    next(); // be sure to let the next middleware handle the modified request.
  });
  server.get('_next/*', (req, _, next) => {
    req.url = req.originalUrl.replace('/_next', '_next');
    next(); // be sure to let the next middleware handle the modified request.
  });
  server.get('*', (req, res) => handle(req, res));

  models.sequelize
    .authenticate()
    .then(() => {
      logInfo('Connection has been established successfully.');
    })
    .catch(err => {
      logError('Unable to connect to the database:', err);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logInfo(`> Ready on http://localhost:${port}`);
  });
});

export default server;
