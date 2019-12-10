/**
 *  User data interface used trough out interaction between back end
 */

export interface User {
    uid: string;
    username: string;
    name: string;
    email: string;
    isProvider: boolean;
    ppid?: string;
    isAdmin?: boolean;
    showHints?: boolean;
}
