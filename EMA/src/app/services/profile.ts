/**
 * profile interface used throughout interactions between back and front end
 */

export interface Profile {
    // ppid, uid will be assigned at creation
    ppid: string;
    uid: string;

    // will be assigned through form
    companyName?: string;
    category?: Categories;
    companyEmail?: string;

    // will be assigned on the profile page itself
    serviceDescription?: string;
    about?: string;
    mainImgID?: string;
    secondaryImgIDs?: Array<string>;
}

export enum Categories {
    venue, music, photo, catering, other
}
