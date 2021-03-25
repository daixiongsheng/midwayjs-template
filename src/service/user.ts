import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';

@Provide()
export class UserService {
    @InjectEntityModel(User)
    user: Repository<User>;

    async create(user: User): Promise<User> {
        user = await this.user.save(user);
        return user;
    }
}
