import {Img} from './img';

export interface Profile {
    ppid: string;
    uid: string;
    companyName?: string;
    category?: Categories;
    serviceDescription?: string;
    about?: string;
    mainImgID?: string;
    secondaryImgIDs?: Array<string>;
}

export enum Categories {
    venue, music, photo, other
}
