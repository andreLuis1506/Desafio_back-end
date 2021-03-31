import { join } from 'path';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Tag from './Tag';
import User from './User';

@Entity('Tools')
export default class Tool {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @OneToMany(() => Tag, tag => tag.tool, { cascade: true, eager: true })
  @JoinTable()
  tags: Promise<Tag[]>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
