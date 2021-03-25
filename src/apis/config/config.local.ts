import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export type DefaultConfig = PowerPartial<EggAppConfig>

export default (appInfo: EggAppInfo): DefaultConfig => {
  const config = {} as DefaultConfig

  config.keys = appInfo.name + '_1615261474295_9294'
  config.security = {
    csrf: false,
  }
  return config
}
