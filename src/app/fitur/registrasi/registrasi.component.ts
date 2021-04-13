import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginWrapper } from 'src/app/model/login-wrapper';
import { AuthenticationService } from 'src/app/service/login.service';

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
    passwordConfirm: string;
    email: string;
    nama: string;
    role: string;
    
    message: string;

    validasiData: boolean;
    currentUri: string;
    currentUrl: string;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public authentication: AuthenticationService
        ){
            this.currentUri = this.router.url;
            this.currentUrl = this.router.url.split('?')[0];

        }
    
    async ngOnInit(){
        this.alert = false;

    }

    register () {
        this.authentication.getRegister(this.nama,this.email, this.password, this.passwordConfirm, this.role).subscribe(
            (res) => {
                this.router.navigate(['dashboard'], {state: res})
            },
            (error) => {                              //Error callback
                this.notifToast(error.error.message)
              }
        )
    }

    notifToast(message) {
        this.loading = false;
        this.validasiData = true;
        this.message = message;
        setInterval(()=> {
            this.validasiData = false
        }, 2000)
    }

}
