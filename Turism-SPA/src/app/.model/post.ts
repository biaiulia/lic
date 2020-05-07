import { Photo } from './photo';

export interface Post {
    id: number;
    postText: string;
    dateAdded: Date;
    photos?: Photo[];
    cityId: number;

}
