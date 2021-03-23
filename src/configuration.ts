import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as orm from '@midwayjs/orm';
import * as swagger from '@midwayjs/swagger';

@Configuration({
    imports: [
        orm, // 加载 orm 组件
        {
            component: swagger,
            enabledEnvironment: ['local'],
        },
    ],
    importConfigs: [
        join(__dirname, './config'), // 加载配置文件（eggjs 下不需要）
    ],
})
export class ContainerLifeCycle implements ILifeCycle {
    @App()
    app: Application;

    async onReady() {}
}
