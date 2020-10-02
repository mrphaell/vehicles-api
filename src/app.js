
import express from 'express';
import 'dotenv/config';
import Response from './core/response';
import path from 'path';
import fs from 'fs';

const bodyParser = require('body-parser')
const app = express();

const response = new Response();
app.use(bodyParser.json());
var env;

response.setApp(app);

app.listen(process.env.PORT, () => {
  setupApp()
  console.log(`Server running on port: ${process.env.PORT}`);
  app.emit('app_started');
});

const setCors = () => {
  Object.keys(env.server.cors).forEach((header) => {
    app.use((req, res, next) => {
      res.header(header, env.server.cors[header]);
      next();
    })
  });
}

const setupApp = () => {
  env = require(('./env/config.js').replace(/ /g, '').replace(/'/g, ''));
  env.app.debug = process.env.DEBUG;
  env.server.port = process.env.PORT;
  env.server.cors['x-powered-by'] = env.app.name;
  setCors();

  syncRoutes();
};

const syncRoutes = () => {
  const unixHidden = new RegExp(/^\..*/);

  fs.readdirSync(path.join(__dirname, './api'))
    .forEach((module) => {
      const moduleIndex = path.join(__dirname, `./api/${module}/index.js`);

      // Load module if path is not hidden and index file exists
      if (!unixHidden.test(module.toString()) && fs.existsSync(moduleIndex))
        try {
          require(moduleIndex).default(app);
        } catch (err) {
          console.log(err);
        }

    });

  app.get('/', (req, res) => {

    const routes = [];

    app._router.stack.forEach(middleware => {
      if (middleware.route && middleware.route.path !== '/') {

        const name = middleware.route.stack.find(stack => {
          return stack.name !== '<anonymous>';
        });

        routes.push({
          name: typeof name === 'undefined' ? null : name.name,
          method: Object.keys(middleware.route.methods)[0].toUpperCase(),
          path: middleware.route.path
        });
      }
    });
    return res.api.send(routes, res.api.codes.OK);
  });

  app.options('*', function (req, res) {
    return res.send(null);
  });

  app.use('*', function (req, res) {
    return res.api.send(null, res.api.codes.NOT_FOUND, null, 'route_not_found');
  });

  app.use((err, req, res, next) => {
    if (err) {
      res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
    }
    next();
  });
}

export default app;