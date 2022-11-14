import KoaRouter from '@koa/router'
import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const baseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
}

const heatControlUrl = process.env.HEAT_CONTROL_URL || 'http://192.168.88.18'

const getHeatControlStatus = async () : Promise<string> => {
  const options = {
    method: 'get',
    url: heatControlUrl + '/control/lower-temperature',
    headers: baseHeaders,
  }

  const { data } = await axios(options)

  return data
}

export const routes = (router: KoaRouter) => {
  router.get('/heatcontrol/:date*', async (ctx) => {
    const result = await getHeatControlStatus()

    ctx.body = result
  })
}
