import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { rejects } from 'assert';
import { Injectable } from '@angular/core';
import { LoginWrapper } from '../model/login-wrapper';

@Injectable({
    providedIn: 'root'
  })

export class BioUserService {
    login: LoginWrapper;

    constructor (
        public afAuth: AngularFireAuth,
        public db: AngularFirestore
        ) 
    {

    }

    createUserBio(data: any) {
        console.log('data service = ', data);
        return this.db.collection('bio-user')
        .add({...data})
        .then(res => {
            console.log('res = ',res)},
            err => {
                rejects(err);
                console.log('err = ',err);
            }
        );
    }
    displayBio(){
       return this.db.collection('bio-user').valueChanges();
    }

    deleteBio(getId: string){
        this.db.doc('bio-user/' + getId).delete();
    }
    updateBio(getId, data) {
        this.db.doc('bio-user/'+ getId).update(data);
    }
}