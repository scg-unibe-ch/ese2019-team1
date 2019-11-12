export interface Profile {
    ppid: string;
    uid: string;
    companyName?: string;
    category?: Categories;
}

export enum Categories {
    venue, music, photo, other

}
