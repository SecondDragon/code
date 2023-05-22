import { validateOrReject, IsDate, IsOptional } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '创建时间',
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    comment: '创建者',
    nullable: true,
  })
  @IsOptional()
  createdBy: string;

  @Column({
    comment: '修改时间',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    comment: '修改者',
    nullable: true,
  })
  @IsOptional()
  updatedBy: string;

  @Column({
    comment: '删除时间',
    type: 'timestamp',
    nullable: true,
  })
  @DeleteDateColumn()
  @IsDate()
  @IsOptional()
  deletedAt: Date;

  @Column({
    comment: '删除者',
    nullable: true,
  })
  @IsOptional()
  deletedBy: string;

  @BeforeInsert()
  setCreatedAt() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  async validateBeforeInsert() {
    await validateOrReject(this);
  }

  @BeforeUpdate()
  async validateBeforeUpdate() {
    await validateOrReject(this, { skipMissingProperties: true });
  }
}
