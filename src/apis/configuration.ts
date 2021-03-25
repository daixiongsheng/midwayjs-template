import { hooks, createConfiguration } from '@midwayjs/hooks'
import { Application } from '@midwayjs/koa'
import bodyParser from 'koa-bodyparser'
import * as orm from '@midwayjs/orm'
export default createConfiguration({
  importConfigs: [
    './config/', // 自动加载 config 目录下所有 配置文件
  ],
  imports: [
    '@midwayjs/koa', // 加载 egg 能力组件
    orm,
    hooks(),
  ],
}).onReady((_, app: Application) => {
  app.use(bodyParser())
})
