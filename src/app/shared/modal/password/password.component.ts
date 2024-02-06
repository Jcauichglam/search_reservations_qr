import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'password',
    templateUrl: 'password.component.html'
})

export class PasswordComponent implements OnInit {
    email: string;
    password = new FormControl('', [Validators.required]);
    result$ = new Subject<boolean>();
    isValid: boolean;
    isSubmit: boolean;

    constructor(public bsModalRef: BsModalRef, private userService: UsersService, ) { }

    ngOnInit() { }


    checkAccess() {
        this.isSubmit = true;
        if(!this.password.valid) {
            return;
        }

        this.userService.checkAcces(this.email, this.password.value).subscribe(result => {
            this.isValid = result;
            this.result$.next(result);
        });
    }
}