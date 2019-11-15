export interface Profile {
    ppid: string;
    uid: string;
    companyName?: string;
    category?: Categories;
    serviceDescription?: string;
    about?: string;
    mainImgUrl?: string;
    secondaryImgUrls?: Array<string>;
}

export enum Categories {
    venue, music, photo, other
}
