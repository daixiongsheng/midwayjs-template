import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { BaseEntity } from './baseEntity';

@EntityModel('system_config')
export class SystemConfig extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'longtext',
        name: 'content',
        comment: '配置内容json字符串的格式',
    })
    content: string;

    @Column({
        name: 'config_key',
        length: 32,
        comment: '配置的key',
    })
    @Index('config_key')
    config_key: string;
}
