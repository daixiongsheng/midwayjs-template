import { EntityModel } from '@midwayjs/orm';
import { ManyToOne, Column, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { User } from './user';

@EntityModel('user_open_id_rel')
export class UserOpenIdRel extends BaseEntity {
    @Column({
        name: 'open_id',
        length: 32,
    })
    @Index('open_id')
    openId: string;

    @ManyToOne(type => User, user => user.openId)
    @JoinColumn({
        name: 'user',
    })
    user: User;
}
