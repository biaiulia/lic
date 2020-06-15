import { User } from './user';

export interface Reply {
    id: number;
    comment: string;
    dateAdded: Date;
    userId: number;
    postId: number;
    user: User;
}