import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo): DefaultConfig => {
    const config = {} as DefaultConfig;

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1615261474295_92941';

    // add your config here
    config.middleware = ['globalMiddleware'];

    config.midwayFeature = {
        // true 代表使用 midway logger
        // false 或者为空代表使用 egg-logger
        replaceEggLogger: true,
    };

    config.orm = {
        type: 'mysql',
        host: 'demo.com',
        port: 3306,
        username: 'test',
        password: 'test',
        database: 'test',
        synchronize: true,
        logging: true,
    };

    config.ors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };

    config.session = {
        renew: true,
    };
    config.redis = {
        client: {
            port: 6379,
            host: 'demo.com',
            password: 'test',
            db: 0,
        },
    };

    config.systemConfig = {
        configKey: 'default',
    };

    return config;
};
