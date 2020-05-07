import { Post } from './post';
import { SafeUrl } from '@angular/platform-browser';

export interface City {
    id: number;
    name: string;
    description: string;
    url: string | SafeUrl;
    nameClean: string;
    posts: Post[];
}
