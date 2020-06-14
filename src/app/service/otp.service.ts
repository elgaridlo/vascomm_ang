import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { rejects } from 'assert';
import { Injectable } from '@angular/core';
import { LoginWrapper } from '../model/login-wrapper';
import { element } from 'protractor';

@Injectable({
    providedIn: 'root'
  })

export class OTPService {
    login: LoginWrapper;

    constructor (
        public afAuth: AngularFireAuth,
        public db: AngularFirestore
        ) 
    {

    }

    createOTP(data: any) {
        console.log('data service = ', data);
        return this.db.collection('otp')
        .add({...data})
        .then(res => {
            console.log('res = ',res)},
            err => {
                rejects(err);
                console.log('err = ',err);
            }
        );
    }
    displayOTP(){
       return this.db.collection('otp').snapshotChanges();
    }

    deletePolicy(idOTP: string){
        this.db.doc('otp/' + idOTP).delete();
    }
}