import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export type DefaultConfig = PowerPartial<EggAppConfig>
/*
"@midwayjs/decorator": "^2.3.0",
        "@midwayjs/logger": "^2.8.11",
        "@midwayjs/orm": "^1.3.0",
        "@midwayjs/swagger": "^1.0.6",
        "@midwayjs/web": "^2.3.0",
        "egg": "^2.0.0",
        "egg-cors": "^2.2.3",
        "egg-redis": "^2.4.0",
        "egg-scripts": "^2.10.0",
        "egg-session-redis": "^2.1.0",
        "jsonwebtoken": "^8.5.1",
        "mysql": "^2.18.1",
        "typeorm": "^0.2.31"

*/
export default (appInfo: EggAppInfo): DefaultConfig => {
  const config = {} as DefaultConfig

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1615261474295_92941'

  // add your config here
  // config.middleware = ['globalMiddleware'];

  // config.midwayFeature = {
  //     // true 代表使用 midway logger
  //     // false 或者为空代表使用 egg-logger
  //     replaceEggLogger: true,
  // };

  // config.orm = {
  //   type: 'mysql',
  //   host: 'test.com',
  //   port: 3306,
  //   username: 'test',
  //   password: 'test',
  //   database: 'test',
  //   synchronize: true,
  //   logging: true,
  // }

  config.ors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  config.session = {
    renew: true,
  }

  config.redis = {
    client: {
      port: 6379,
      host: 'demo.com',
      password: 'test',
      db: 0,
    },
  }

  config.systemConfig = {
    configKey: 'default',
  }

  return config
}
