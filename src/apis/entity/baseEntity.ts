import { Column, PrimaryGeneratedColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'created_at',
    type: 'datetime',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt: Date

  @Column({
    name: 'updated_at',
    type: 'datetime',
    update: true,
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date
}
