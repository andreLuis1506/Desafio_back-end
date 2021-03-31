import { type } from 'os';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Tool from './Tool';

@Entity('Users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number; 

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @ManyToMany(type => Tool)
    @JoinTable()
    tools: Tool

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    upadatedAt: Date;

}