import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginWrapper } from 'src/app/model/login-wrapper';
import { AuthenticationService } from 'src/app/service/login.service';
import { log } from 'console';
import { element } from 'protractor';
import { OTPService } from 'src/app/service/otp.service';
import { OTPWrapper } from 'src/app/model/otp-wrapper';
import { rejects } from 'assert';
import { UploadService } from 'src/app/service/upload.service';

@Component({
    selector: 'upload-app',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.css']
})
export class UploadComponent implements OnInit {
    alert: boolean;
    login = new LoginWrapper();

    loading: boolean = false;

    y1: string;
    interval;
    popup: boolean = true

    message: string;

    phoneNumber: string;
    validasiData: boolean;

    timer: number = 45;
    isHovering: boolean;

    profilePhotoUrl: string;

    url = [];

    files: File[] = [];


    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public db: AngularFirestore,
        public upload: UploadService
    ) {
        let data = this.router.getCurrentNavigation().extras.state;
        console.log('data = ', data)
        if (!data) {
            this.router.navigate([''])
        } else {
            this.login.phoneNumber = data;
            // this.login.password = data.password;
        }
    }

    async ngOnInit() {
        this.alert = false;
        // this.login.phoneNumber = '12312312321';
        this.phoneNumber = this.login.phoneNumber;
        this.lookImage()
    }

    redirectToDashboard() {
        this.router.navigate(['dashboard'], { state: this.login.phoneNumber })
    }
    notifToast() {
        this.loading = false;
        this.validasiData = true;
        setInterval(() => {
            this.validasiData = false
        }, 2000)
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    onDrop(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }
        this.url = []
    }

    lookImage() {
        this.url = []
        this.db.collection('profilePhoto').valueChanges().subscribe(
            resp => {
                resp.map(
                    x => {
                        console.log('profile ', x)
                        this.profilePhotoUrl = x['downloadURL']
                    }
                )
            }
        )
        this.db.collection('files').valueChanges().subscribe(
            resp => {
                resp.map(
                    x => {
                        this.checkedImageUser(x);
                    }
                )
            }
        )
    }

    checkedImageUser(params) {

        if (params['phoneNumber'] === this.phoneNumber) {
            this.url.push(params.downloadURL);
        }
    }
    changePhotoProfile(event) {
        console.log('event = ', event.target.src)
        let getId = '';
        let downloadURL = event.target.src;
        let params = {
            phoneNumber: this.phoneNumber, downloadURL: downloadURL
        };
        if (downloadURL) {
            console.log('sisis ')
            this.upload.displayUpload().subscribe(
                x => {
                    console.log('x ada enggal = ',x)
                    if (!x) {
                        x.map(
                            e => {
                                let dataOTP = e.payload.doc.data();
                                if (dataOTP['phoneNumber'] === this.phoneNumber) {
                                    console.log('masuk dapat Id', downloadURL);
                                    getId = e.payload.doc.id;
                                    return this.changePhoto(getId, params)
                                } 
                            }
                        )
                    } else {
                        console.log('masuk nih')
                        return this.upload.createUpload(params);
                    }
                }
            )
        }
    }

    async changePhoto(id, params) {
        this.upload.updatePhotoProfile(id, params);
    }
}
