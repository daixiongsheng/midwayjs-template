import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@EntityModel('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nick_name',
        length: 128,
        comment: '用户昵称',
    })
    username: string;

    @Column({
        name: 'is_deleted',
        type: 'tinyint',
        comment: '删除标识:0-未删除;1-删除',
        default: false,
    })
    isDeleted: boolean;
}
