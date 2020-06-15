import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { rejects } from 'assert';
import { Injectable } from '@angular/core';
import { LoginWrapper } from '../model/login-wrapper';
import { element } from 'protractor';

@Injectable({
    providedIn: 'root'
  })

export class UploadService {
    login: LoginWrapper;

    constructor (
        public afAuth: AngularFireAuth,
        public db: AngularFirestore
        ) 
    {

    }

    createUpload(data: any) {
        console.log('data service = ', data);
        return this.db.collection('profilePhoto')
        .add({...data})
        .then(res => {
            console.log('res = ',res)},
            err => {
                rejects(err);
                console.log('err = ',err);
            }
        );
    }
    displayUpload(){
       return this.db.collection('profilePhoto').snapshotChanges();
    }

    deletePolicy(getId: string){
        this.db.doc('profilePhoto/' + getId).delete();
    }
    updatePhotoProfile(getId, data) {
        this.db.doc('profilePhoto/'+ getId).update(data);
    }
}