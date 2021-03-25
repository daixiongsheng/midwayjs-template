import { Provide, Inject, Schedule, CommonSchedule } from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
@Schedule({
    interval: 100000, // 2.333s 间隔
    type: 'worker', // 指定某一个 worker 执行
})
export class HelloCron implements CommonSchedule {
    @Inject()
    ctx: Context;

    // 定时执行的具体任务
    async exec() {
        console.log(process.pid, 'hello');
        // this.ctx.logger.info(process.pid, 'hello');
    }
}
