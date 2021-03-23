import { Provide, App, Config } from '@midwayjs/decorator';
import { Application } from 'egg';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { SystemConfig } from '../entity/system';

@Provide()
export class SystemService {
    @InjectEntityModel(SystemConfig)
    system: Repository<SystemConfig>;

    @App()
    app: Application;

    @Config('systemConfig')
    config;

    async getAppId(): Promise<string> {
        return (await this.getSystemConfig()).appId;
    }
    async getSecret(): Promise<string> {
        return (await this.getSystemConfig()).secret;
    }
    async getSystemConfig(
        configKey: string = this.config.configKey
    ): Promise<any> {
        {
            const config = await this.app.redis.get(configKey);
            if (config) {
                return JSON.parse(config || null);
            }
        }
        const config = await this.system.findOne({
            select: ['content'],
            where: {
                config_key: configKey,
            },
        });
        this.app.redis.set(configKey, config.content);
        return JSON.parse(config.content || null);
    }
}
