import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { UserOpenIdRel } from '../entity/userOpenIdRel';

@Provide()
export class UserService {
    @InjectEntityModel(User)
    user: Repository<User>;

    @InjectEntityModel(UserOpenIdRel)
    openId: Repository<UserOpenIdRel>;

    async get(id: number): Promise<User> {
        return await this.user.findOne(id, {
            relations: ['openId'],
        });
    }

    async getByOpenId(openId: string): Promise<User> {
        return (
            (await this.openId.findOne({
                where: {
                    openId,
                },
                relations: ['user'],
            })) || {}
        ).user;
    }

    async remove(id: number): Promise<boolean> {
        const user = await this.get(id);
        user.isDeleted = true;
        await this.user.save(user);
        return true;
    }

    async create(user: User, openId?: string): Promise<User> {
        user = await this.user.save(user);
        const open = { openId: openId } as UserOpenIdRel;
        open.user = user;
        await this.openId.save(open);
        return user;
    }

    async update(data: Partial<User>, id?: number): Promise<boolean> {
        if (id !== undefined) {
            const user = await this.get(id);
            this.user.save(user, { data });
        } else {
            try {
                await this.user.save(data);
            } catch (err) {
                console.error(err);
                return false;
            }
        }
        return true;
    }
}
