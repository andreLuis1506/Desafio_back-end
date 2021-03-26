import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Tag from './Tool_tags';

@Entity('Tools')
export default class Tool {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @OneToMany(() => Tag, tag => tag.tool, { onDelete: 'CASCADE' })
  @JoinTable()
  tags: Promise<Tag[]>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
