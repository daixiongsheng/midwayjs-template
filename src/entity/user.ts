import { EntityModel } from '@midwayjs/orm';
import {
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { UserOpenIdRel } from './userOpenIdRel';

@EntityModel('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nick_name',
        length: 128,
        comment: '用户昵称',
    })
    nickName: string;

    @Column({
        name: 'union_id',
        length: 32,
        comment: '开放平台下unionid',
    })
    @Index('union_id')
    unionId: string;

    @Column({
        name: 'head_img_url',
        length: 256,
        comment: '头像',
    })
    headImgUrl: string;

    @Column({
        name: 'oss_head_img_url',
        length: 256,
        comment: 'OSS头像',
    })
    ossHeadImgUrl: string;

    @Column({
        name: 'gender',
        type: 'tinyint',
        comment: '性别 0:未知 1:男 2:女',
    })
    gender: number;

    @Column({
        name: 'city',
        length: 128,
        comment: '城市',
    })
    city: string;

    @Column({
        name: 'country',
        length: 128,
        comment: '国家代码',
    })
    country: string;

    @Column({
        name: 'province',
        length: 128,
        comment: '省份',
    })
    province: string;

    @Column({
        name: 'language',
        length: 128,
        comment: '用户语言',
    })
    language: string;

    @Column({
        name: 'is_deleted',
        type: 'tinyint',
        comment: '删除标识:0-未删除;1-删除',
        default: false,
    })
    isDeleted: boolean;

    @Column({
        name: 'phone_number',
        length: 15,
        comment: '手机号码',
    })
    @Index('phone_number')
    phoneNumber: string;

    @OneToMany(type => UserOpenIdRel, userOpenIdRel => userOpenIdRel.user, {
        cascade: true,
    })
    @JoinColumn({
        name: 'open_id',
    })
    openId: UserOpenIdRel[];
}
