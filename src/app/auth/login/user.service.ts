import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { authData } from '../auth-data.model';

@Injectable()

export class UserService {
    private user: User;

    constructor(private http: HttpClient) {

    }

    login(authData: authData) {
        return this.http.post<any>('/login',authData);
    }
    
    getUser() {
        return { ...this.user }
    }

    isAuth() {
        return this.user != null
    }
}