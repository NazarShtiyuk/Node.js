import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';
import { Comment } from './comment';

export interface IPost {
    title: string;
    text: string;
    userId: number;
}

@Entity('Posts', { database: 'myDB' })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments: Comment[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;
}
