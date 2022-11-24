import KoaRouter from '@koa/router'
import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const baseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
}

const heatControlUrl = process.env.HEAT_CONTROL_URL || 'http://localhost:8000'

const getHeatControlStatus = async () : Promise<string> => {
  const options = {
    method: 'get',
    url: heatControlUrl + '/control/lower-temperature',
    headers: baseHeaders,
  }

  const { data } = await axios(options)

  return data
}

const getHeatControlSchedule = async (scheduleId : any) : Promise<string> => {
  const path = scheduleId ? `/schedule/lower-temperature/${scheduleId}` : '/schedule/lower-temperature'

  const options = {
    method: 'get',
    url: heatControlUrl + path,
    headers: baseHeaders,
  }

  const { data } = await axios(options)

  return data
}

const createHeatControlSchedule = async (schedule: any) : Promise<void> => {
  const options = {
    method: 'post',
    url: heatControlUrl + '/schedule/lower-temperature',
    headers: baseHeaders,
    data: schedule,
  }

  await axios(options)
}

const updateHeatControlSchedule = async (scheduleId: Number, schedule: any) : Promise<void> => {
  const options = {
    method: 'post',
    url: `${heatControlUrl}/schedule/lower-temperature/${scheduleId}`,
    headers: baseHeaders,
    data: schedule,
  }

  await axios(options)
}

export const routes = (router: KoaRouter) => {
  router.get('/heatcontrol/schedule/:scheduleId*', async (ctx) => {
    const result = await getHeatControlSchedule(ctx.params.scheduleId)

    ctx.body = result
  })

  router.post('/heatcontrol/schedule/:scheduleId', async (ctx) => {
    await updateHeatControlSchedule(Number(ctx.params.scheduleId), ctx.request.body)

    ctx.status = 204
  })

  router.post('/heatcontrol/schedule', async (ctx) => {
    await createHeatControlSchedule(ctx.request.body)

    ctx.status = 204
  })

  router.get('/heatcontrol/:date*', async (ctx) => {
    const result = await getHeatControlStatus()

    ctx.body = result
  })
}
