import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
  appId: "1759490",
  key: "03609570c3425820431e",
  secret: "1778cf0a5e28c093ea43",
  cluster: 'eu',
  useTLS: true,
})

export const pusherClient = new PusherClient("03609570c3425820431e", {
  cluster: 'eu',
  activityTimeout: 30000,
})