import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Tool from './Tool';

@Entity('Tags')
export default class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'tag_name' })
  tagName: string;

  @ManyToOne(() => Tool, tool => tool.tags)
  @JoinColumn({ name: 'tool_id', referencedColumnName: 'id' })
  tool: Tool;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
