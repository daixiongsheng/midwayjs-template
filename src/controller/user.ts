import {
    Inject,
    Controller,
    Get,
    Post,
    Provide,
    Param,
    Validate,
    App,
} from '@midwayjs/decorator';
import { Application, Context } from 'egg';
import { UserService } from '../service/user';
import { Response } from '../typings/interface';
import { success } from '../utils';
import { CreateUserDTO } from './../dto/user';

@Provide()
@Controller('/api/user')
export class UserController {
    @Inject()
    ctx: Context;

    @App()
    app: Application;

    @Inject()
    userService: UserService;

    @Get('/get')
    @Validate()
    async update(@Param() id: number): Promise<Response> {
        return success(id);
    }

    @Post('/create')
    @Validate()
    async create(): Promise<Response> {
        const user = await this.userService.create(
            CreateUserDTO.generateDefaultUser()
        );
        return success(user);
    }
}
