import { Post } from './post';

export interface City {
    id: number;
    name: string;
    description: string;
    url: string;
    posts: Post[];
}
