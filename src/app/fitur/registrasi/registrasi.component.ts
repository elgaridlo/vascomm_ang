import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginWrapper } from 'src/app/model/login-wrapper';
import { AuthenticationService } from 'src/app/service/login.service';
import { log } from 'console';
import { element } from 'protractor';

@Component({
  selector: 'registrasi-app',
  templateUrl: './registrasi.component.html',
  styleUrls: [ '../login-fiture/login.css' ]
})
export class RegistrasiComponent implements OnInit  {
    alert: boolean;
    login = new LoginWrapper();
    
    loading: boolean = false;

    password: string;
    phoneNumber: string;
    message: string;

    validasiData: boolean;
    currentUri: string;
    currentUrl: string;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public db: AngularFirestore,
        public authentication: AuthenticationService
        ){
            this.currentUri = this.router.url;
            this.currentUrl = this.router.url.split('?')[0];
            // let data = this.router.getCurrentNavigation().extras.state;
            // if (!data) {
            //     this.router.navigate([''])
            // } else {
            //     this.login.phoneNumber = data.phoneNumber;
            //     this.login.password = data.password;
            // }
        }
    
    async ngOnInit(){
        this.alert = false;

    }
    register () {
        let user = false;
        this.loading = true;
        if ( this.password && this.phoneNumber ) {
            this.login.password = this.password;
            this.login.phoneNumber = this.phoneNumber;
            let validasi = this.validasi(this.login);
            if (validasi) {
                this.authentication.displayData().subscribe(
                    resp => {
                        for (let isi of resp) {
                            if (isi['phoneNumber'] === this.login.phoneNumber) {
                                user = true;
                                break;
                            }
                        }
                        if (!user) {
                            this.authentication.createUser(this.login);
                            this.message = 'Berhasil Disimpan';
                            this.notifToast();
                            this.router.navigate([''])
                        } else {
                            this.message = 'Nomor ini sudah dipakai !';
                            this.notifToast();
                        }
                    }
                )
            } else {
                this.notifToast()
            }
        } else {
            this.notifToast();
        }
    }

    notifToast() {
        this.loading = false;
        this.validasiData = true;
        setInterval(()=> {
            this.validasiData = false
        }, 2000)
    }
    validasi(login: LoginWrapper) {
        if (login) {
            console.log('length = ', login.phoneNumber.length)
            if (login.phoneNumber.length < 10 && login.phoneNumber > 12) {
                this.message = 'Phone Number harus 10 - 12 digit'
                return false
            }
            if(login.password.length < 5) {
                this.message = 'Password Harus lebih dari 4 character'
                return false
            }

            if(login.phoneNumber.match(/[^0-9]/)) {
                this.message = 'Tidak boleh ada karakter didalam phone number'
                return false
            }
        }   
        return true;
    }
}
