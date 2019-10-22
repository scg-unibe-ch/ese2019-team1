import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticateService} from './authentication.service';
import {Observable} from 'rxjs';
import {tap, map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private AuthService: AuthenticateService,
        private router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.AuthService.isAuthenticated) {
            return true;
        }
        this.router.navigate(['/']);
    }
}
