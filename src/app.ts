import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import pinoLogger from 'koa-pino-logger';
import cors from '@koa/cors';

import api from './api';
import errorHandler from './middlewares/error-handler';

const app = new Koa();

app.use(cors());

app.on('error', (err) => {
  console.log(err);
});

app.use(errorHandler());

// TODO: Remove me. koa-pino-logger uses standard log levels
app.use(async (ctx, next) => {
  await next();
});

app.use(bodyParser());
app.use(api.routes());

export default app;
