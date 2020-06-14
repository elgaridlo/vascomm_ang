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

@Component({
  selector: 'otp-app',
  templateUrl: './otp-fitur.component.html',
  styleUrls: [ '../login-fiture/login.css' ]
})
export class OTPComponent implements OnInit  {
    alert: boolean;
    login = new LoginWrapper();
    
    loading: boolean = false;

    x1: string;
    x2: string;
    x3: string;
    x4: string;

    y1: string;
    interval;
    popup: boolean = true

    message: string;

    timer: number = 45;
    otpData = new OTPWrapper();

    validasiData: boolean;
    currentUri: string;
    currentUrl: string;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public db: AngularFirestore,
        public otp: OTPService
        ){
            this.currentUri = this.router.url;
            this.currentUrl = this.router.url.split('?')[0];
            let data = this.router.getCurrentNavigation().extras.state;
            console.log('data = ', data)
            if (!data) {
                this.router.navigate([''])
            } else {
                this.login.phoneNumber = data;
                // this.login.password = data.password;
            }
        }
    
    async ngOnInit(){
        this.alert = false;
        this.login.phoneNumber = '12312312321'; 
    }

    tokenGenerate() {
        let digit = '';
        let length = 4;
        let digits       = '1234567890';
        let digitsLength = digits.length;

        for ( let i = 0; i < length; i++ ) {
            digit += digits.charAt(Math.floor(Math.random() * digitsLength));
        }
        this.y1 = digit;
        this.otpData.phoneNumber = this.login.phoneNumber;
        this.otpData.token = this.y1;
        this.timerSet(this.otpData);
        this.saveOTP(this.otpData);
    }

    timerSet(data) {
        this.timer = 45;
        this.interval = setInterval(() => {
            if(this.timer > 0) {
              this.timer--;
            } else {
                clearInterval(this.interval)
                this.deleteOTP(data)
            }
          },1000)
    }
    deleteOTP(data) {
        let getId = '';
        console.log('delete')
        this.otp.displayOTP().subscribe(x =>{
            x.map(
                e=> {
                    let dataOTP = e.payload.doc.data();
                    if (dataOTP['phoneNumber'] === data.phoneNumber && dataOTP['token'] === data.token) {
                        console.log('masuk dapat Id', data.phoneNumber, data.token);
                        getId = e.payload.doc.id;
                        console.log('id = ', getId)
                        this.otp.deletePolicy(getId)
                    }
                }
            )
        })
    }
    saveOTP(data) {
        if (data) {
            this.otp.createOTP(data);
        }
    }
    validateOTP() {
        let token = `${this.x1}${this.x2}${this.x3}${this.x4}`;
        let getId = '';
        this.otp.displayOTP().subscribe(x =>{
            x.map(
                e=> {
                    let dataOTP = e.payload.doc.data();
                    if (dataOTP['phoneNumber'] === this.login.phoneNumber && dataOTP['token'] === token) {
                        console.log('masuk dapat Id', this.login.phoneNumber, token);
                        getId = e.payload.doc.id;
                        console.log('id = ', getId)
                        this.otp.deletePolicy(getId)
                        clearInterval(this.interval)
                        this.redirectToDashboard();
                    } else {
                        this.message = 'Anda salah memasukan OTP';
                        this.notifToast();
                    }
                }
            )
        })
    }
    redirectToDashboard () {
        this.router.navigate(['dashboard'], {state: this.login.phoneNumber})
    }
    notifToast() {
        this.loading = false;
        this.validasiData = true;
        setInterval(()=> {
            this.validasiData = false
        }, 2000)
    }
}
