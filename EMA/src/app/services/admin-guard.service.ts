import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {UserHandler} from './user-handler';
import {AuthenticateService} from './authentication.service';

/**
 * activates route for admin page if user is admin
 */

@Injectable({
    providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

    constructor(
        private userHandler: UserHandler,
        private authService: AuthenticateService
    ) {
    }

    /**
     * canActivate method for route activation
     * @param route to the admin page
     * @param state of route
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise<boolean>(
            async (resolve) => {
              const uid = this.authService.afAuth.auth.currentUser.uid;
              await this.userHandler.readUser(uid).then(
                  usr => {
                    resolve(usr.isAdmin === true);
                  },
              );
            }
        );
    }
}
