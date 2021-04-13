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
    email: string;
    password: string;
    currentUri: string;
    currentUrl: string;
    dataUser: LoginWrapper;
    message: string;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public authentication: AuthenticationService,
        public toast: ToastService
        ){
            this.currentUri = this.router.url;
            this.currentUrl = this.router.url.split('?')[0];
            
        }
    
    async ngOnInit(){
       this.login = new LoginWrapper();
    }
    
    loginUser() {
        this.message = '';
        this.login = new LoginWrapper;
        this.authentication.getLogin(this.email, this.password).subscribe(
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
