export interface User {
    uid: string;
    username: string;
    name?: string;
    email: string;
    isProvider: boolean;
    ppid?: string;
    isAdmin?: boolean;
}
