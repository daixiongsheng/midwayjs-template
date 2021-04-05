import { hooks, createConfiguration } from '@midwayjs/hooks'
import { Application } from '@midwayjs/koa'
import { IMidwayContainer, MidwayContainer } from '@midwayjs/core'
import bodyParser from 'koa-bodyparser'
import * as orm from '@midwayjs/orm'
export default createConfiguration({
  importConfigs: [
    './config/', // 自动加载 config 目录下所有 配置文件
  ],
  imports: [
    '@midwayjs/koa', // 加载 egg 能力组件
    // orm,
    hooks(),
  ],
}).onReady((container: IMidwayContainer, app: Application) => {
  console.log(container instanceof MidwayContainer)

  app.use(bodyParser())
})
