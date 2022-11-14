import KoaRouter from '@koa/router'

const router = new KoaRouter();

import { routes as heatControlRoutes } from './services/heatControlService'

heatControlRoutes(router)

export default router;
