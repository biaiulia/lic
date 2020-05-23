import { Post } from './post';
import { SafeUrl } from '@angular/platform-browser';

export interface City {
    id: number;
    name: string;
    description: string;
    url: string | SafeUrl; // de ce safeurl?
    nameClean: string;
    posts: Post[];
}
