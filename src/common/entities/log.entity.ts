import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsDateString, IsNotEmpty } from 'class-validator';

export abstract class LogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsDateString()
  @IsNotEmpty()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @IsDateString()
  updatedAt: Date | null;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
