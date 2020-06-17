const Koa = require('koa');
const Router = require('./router');
const Logger = require('./middleware/logger');
const serveConfig = require('../serveConfig/config');

const app = new Koa();

app.use(Logger)
    .use(Router.routes())
    .listen(serveConfig.port);