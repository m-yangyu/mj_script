const Koa = require('koa');
const Router = require('./router');
const Logger = require('./middleware/logger');

const app = new Koa();

app.use(Logger)
    .use(Router.routes())
    .listen(1234);