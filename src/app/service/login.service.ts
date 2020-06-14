import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { rejects } from 'assert';
import { Injectable } from '@angular/core';
import { LoginWrapper } from '../model/login-wrapper';
import { element } from 'protractor';

@Injectable({
    providedIn: 'root'
  })

export class AuthenticationService {
    login: LoginWrapper;
    constructor (
        public afAuth: AngularFireAuth,
        public db: AngularFirestore
        ) 
    {

    }

    createUser(data: any) {
        console.log('data service = ', data);
        return this.db.collection('authentication')
        .add({...data})
        .then(res => {
            console.log('res = ',res)},
            err => {
                rejects(err);
                console.log('err = ',err);
            }
        );
    }
    displayData(){
       return this.db.collection('authentication').valueChanges();
    }
}