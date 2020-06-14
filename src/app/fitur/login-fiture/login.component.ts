import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginWrapper } from 'src/app/model/login-wrapper';
import { AuthenticationService } from 'src/app/service/login.service';
import { log } from 'console';
import { ToastService } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: [ './login.css' ]
})
export class LoginComponent implements OnInit  {
    alert: boolean = false;
    validasiData: boolean = false;
    loading: boolean = false;
    login:  LoginWrapper;
    phoneNumber: string;
    password: string;
    currentUri: string;
    currentUrl: string;
    dataUser: LoginWrapper;
    message: string;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public db: AngularFirestore,
        public authentication: AuthenticationService,
        public toast: ToastService
        ){
            this.currentUri = this.router.url;
            this.currentUrl = this.router.url.split('?')[0];
            
        }
    
    async ngOnInit(){
       
    }
    
    async filterByPhoneNumber(phoneNumber, password) {
        await this.authentication.displayData().subscribe(
            x => {
                this.check(phoneNumber, password, x);  
            }
        )
    }
    check (phoneNumber, password, x ) {
        let register = false;
        this.login = undefined;
        for (let element of x) {
            if (element['phoneNumber'] === phoneNumber) {
                if (element['password'] === password) {
                    this.dataUser = {
                        phoneNumber: element['phoneNumber'], password: element['password']
                    }
                    console.log('sudah nih ')
                    this.lemparData(this.dataUser);
                    register = false;
                    break;
                } else {
                    this.message = 'Password anda salah'
                    this.notifToast();
                    register = false;
                    break;
                }
            } else {
                register = true;
            }
        }
        this.registrasi(register);
        
    }

    loginUser() {
        this.message = '';
        this.login = new LoginWrapper;
        console.log('phone ', this.phoneNumber);
        console.log('pass ', this.password);
        if ( this.password && this.phoneNumber ) {
            this.loading = true;
            
            console.log('masuk')
            this.login.password = this.password;
            this.login.phoneNumber = this.phoneNumber;
            this.filterByPhoneNumber(this.login.phoneNumber, this.login.password);
            } else {
            this.message = 'Data harus terisi'
            this.notifToast();
        }
    }
    lemparData(login) {
        this.loading = false;
        this.router.navigate(['dashboard'], {state: login})
    }
    registrasi(param) {
        this.loading = false
        this.alert = param === true ? true: false;
        setInterval(()=> {
            this.alert = false
        }, 2000)
    }

    daftar() {
        this.router.navigate(['register'])
    }

    notifToast() {
        this.loading = false;
        this.validasiData = true;
        setInterval(()=> {
            this.validasiData = false
        }, 2000)
    }
}
