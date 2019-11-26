import {Img} from './img';

export interface Profile {
    ppid: string;
    uid: string;
    providerName: string;
    category?: Categories;
    serviceDescription?: string;
    email: string;
}

export enum Categories {
    venue, music, photo, other
}
