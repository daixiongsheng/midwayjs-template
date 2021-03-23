// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/decorator';
import { User } from '../entity/user';

export class CreateUserDTO {
    @Rule(RuleType.string().max(128))
    nickName: number;

    @Rule(RuleType.string().max(32))
    unionId: number;

    @Rule(RuleType.string().max(256))
    headImgUrl: number;

    @Rule(RuleType.string().max(256))
    ossHeadImgUrl: number;

    @Rule(RuleType.number().max(2))
    gender: number;

    @Rule(RuleType.string().max(128))
    city: number;

    @Rule(RuleType.string().max(128))
    country: number;

    @Rule(RuleType.string().max(128))
    province: number;

    @Rule(RuleType.string().max(128))
    language: number;

    @Rule(RuleType.string().max(15))
    phoneNumber: number;

    toUser(): User {
        return ({ ...this } as unknown) as User;
    }

    static generateDefaultUser(): User {
        return {
            nickName: '',
            gender: 0,
            unionId: '',
            headImgUrl: '',
            ossHeadImgUrl: '',
            country: '',
            language: '',
            province: '',
            city: '',
            phoneNumber: '',
        } as User;
    }
}

export class UpdateUserDTO extends CreateUserDTO {
    @Rule(RuleType.number().required())
    id: number;
}
