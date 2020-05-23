import { Photo } from './photo';
import { Reply } from './reply';
import { Like } from './like';

export interface Post {
    id: number;
    postText: string;
    dateAdded: Date;
    photos?: Photo[];
    cityId: number;
    postLikes?: Like[];
    replies?: Reply[];

}
