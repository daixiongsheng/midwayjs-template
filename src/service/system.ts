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

    async getSystemConfig(
        configKey: string = this.config.configKey
    ): Promise<any> {
        const config = await this.system.findOne({
            select: ['content'],
            where: {
                config_key: configKey,
            },
        });
        return JSON.parse(config.content || null);
    }
}
