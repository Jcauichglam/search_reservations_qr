import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from '../services/users.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(public router: Router, private userService : UsersService) { }

    canActivate(): boolean {
        if (!this.userService.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
