import {Injectable} from '@angular/core';
import {AuthenticateService} from './authentication.service';
import {UserHandler} from './user-handler';
import {ProfileHandlerService} from './profile-handler.service';

/**
 * user to determine ownership of profile and control access to page editing
 */
@Injectable({
    providedIn: 'root'
})
export class ProfileGuardService {

    constructor(private authService: AuthenticateService,
                private userHandler: UserHandler,
                private profileHandler: ProfileHandlerService) {
    }

    /**
     * returns promise with boolean whether user is profile owner
     * @param uid user that is accessing profile
     * @param ppid profile id that's been accessed
     */
    isProfileOwner(uid: string, ppid: string): Promise<boolean> {
        return new Promise<boolean>(
            async (resolve) => {
                await this.userHandler.readUser(uid).then(
                    user => {
                        if (user.isProvider && user.ppid === ppid) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    err => resolve(false)
                );

            });
    }
}
