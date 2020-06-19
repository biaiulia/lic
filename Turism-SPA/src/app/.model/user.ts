import { Post } from './post';

export interface User {
    id: number;
    userName: string;
    birthDate: Date;
    firstName: string;
    lastName: string;
    age: number;
    joined: Date;
    points: number;
    country?: string;
    city?: string;
    url?: string;
    publicId?: string;
    posts?: Post[];
    username?: string;
}
