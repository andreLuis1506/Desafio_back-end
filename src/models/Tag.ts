import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Tool from './Tool';

@Entity('Tags')
export default class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  tagName: string;

  @ManyToOne(() => Tool, tool => tool.tags, { cascade: true })
  tool: Tool;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
