import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';

@Provide()
export class UserService {
    @InjectEntityModel(User)
    user: Repository<User>;

    async create(): Promise<User> {
        const user = {
            username: 'username',
            gender: 0,
        };
        return await this.user.save(user);
    }
}
