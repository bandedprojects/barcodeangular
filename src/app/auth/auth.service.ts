import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Data } from '../data.model';
import { authData } from './auth-data.model';

@Injectable()

export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router,private http: HttpClient) {

    }

    login(data: any) {     
        this.user = {
            username: data.username,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);
        this.router.navigate(['/viewbatch']);
        
    }

    logout() {
       this.user = null; 
       this.authChange.next(false);
       this.router.navigate(['']);
    }

    getUser() {
        return { ...this.user }
    }

    isAuth() {
        return this.user != null
    }
}