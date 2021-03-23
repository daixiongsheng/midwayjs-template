import {
    Inject,
    Controller,
    Get,
    Put,
    Del,
    Post,
    Provide,
    Param,
    Body,
    ALL,
    Validate,
    Logger,
    App,
} from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Application, Context } from 'egg';
import { UserService } from '../service/user';
import { Response } from '../typings/interface';
import { success } from '../utils';
import { CreateUserDTO, UpdateUserDTO } from './../dto/user';

@Provide()
@Controller('/user')
export class UserController {
    @Inject()
    ctx: Context;

    @App()
    app: Application;

    @Inject()
    userService: UserService;

    @Logger()
    logger: ILogger;

    @(CreateApiDoc()
        .param('用户id', {
            required: false,
        })
        .summary('获取用户信息')
        .build())
    @Get('/get/:userId')
    async get(@Param() userId: number): Promise<Response> {
        console.log('id---------', userId);
        this.ctx.session.hello2 = '123';
        console.log(await this.app.redis.get('hello2'));

        const user = await this.userService.get(userId);
        return success(user);
    }

    @Put('/update')
    @Validate()
    async update(
        @Body() id: number,
        @Body() data: UpdateUserDTO
    ): Promise<Response> {
        const user = await this.userService.update(data.toUser(), id);
        return success(user);
    }

    @Del('/remove')
    @Validate()
    async remove(@Body() id: number): Promise<Response> {
        const result = await this.userService.remove(id);
        return success(result);
    }

    @Post('/create')
    @Validate()
    async create(@Body(ALL) data: CreateUserDTO): Promise<Response> {
        const user = await this.userService.create(data.toUser());
        return success(user);
    }
}
