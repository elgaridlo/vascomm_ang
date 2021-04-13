import { Injectable } from '@angular/core';
import { LoginWrapper } from '../model/login-wrapper';
import { map } from 'rxjs/operators';

import { HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
    providedIn: 'root'
  })

export class AuthenticationService {
    login: LoginWrapper;
    constructor (
        private httpClient: HttpClient
        ) 
    {}

    getLogin (email, password) {
        return this.httpClient.post<any>(`${environment.apiUrl}/api/users/login`, { email, password })
        .pipe(map( user => {
            console.log('user - ', user)
            return user.data.user
        }));
    }

    getRegister (name, email, password, passwordConfirm, role) {
        return this.httpClient.post<any>(`${environment.apiUrl}/api/users/signup`, { name, email, password, passwordConfirm,role })
        .pipe(map( user => {
            console.log('user - ', user)
            return user.data.newUser
        }));
    }

    getAll () {
        return this.httpClient.get<any>(`${environment.apiUrl}/api/users`)
        .pipe(map( user => {
            return user.data.data
        }));
    }
}