import {
    Inject,
    Controller,
    Del,
    Post,
    Provide,
    Body,
    ALL,
    Validate,
    Logger,
    Config,
    App,
} from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Application, Context } from 'egg';
import { UserService } from '../service/user';
import { SystemService } from '../service/system';
import { Response } from '../typings/interface';
import { success, error, dealPath, generateToken } from '../utils';
import { CreateUserDTO } from './../dto/user';

@Provide()
@Controller('/wx')
export class WxController {
    @Inject()
    ctx: Context;

    @App()
    app: Application;

    @Inject()
    userService: UserService;

    @Inject()
    systemService: SystemService;

    @Logger()
    logger: ILogger;

    @Config('systemConfig')
    config;

    @(CreateApiDoc()
        .param('wx.login返回的code', {
            required: false,
        })
        .summary('静默登录')
        .build())
    @Post('/user/login')
    @Validate()
    async wxLogin(@Body() code: string): Promise<Response> {
        const appid = await this.systemService.getAppId();
        const secret = await this.systemService.getSecret();
        const url = 'https://api.weixin.qq.com/sns/jscode2session';
        const query = {
            appid,
            secret,
            grant_type: 'authorization_code',
            js_code: code,
        };
        const response = await this.ctx.curl(dealPath(url, query));
        const data = JSON.parse(response.data.toString());
        const {
            openId = 'openId',
            session_key,
            expires_in = 7200,
            errmsg,
        } = data;
        if (!errmsg) {
            return error(errmsg);
        }
        let user = await this.userService.getByOpenId(openId);

        if (!user) {
            user = await this.userService.create(
                CreateUserDTO.generateDefaultUser(),
                openId
            );
        }

        const token = generateToken(openId);
        this.ctx.set('token', token);
        this.app.sessionStore.set(token, openId, expires_in);
        this.app.sessionStore.set(openId + 'sessionKey', session_key);
        return success({
            token,
            openId,
        });
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
