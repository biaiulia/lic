import { Photo } from './photo';
import { Reply } from './reply';
import { Like } from './like';
import { User } from './user';
import { City } from './city';

export interface Post {
    id: number;
    postText: string;
    approved: number;
    title: string;
    type?: string;
    getThere?: string;
    dateAdded: Date;
    userId: number;
    photos?: Photo[];
    cityId: number;
    postLikes?: Like[];
    replies?: Reply[];
    user: User;
    city: City;

}
