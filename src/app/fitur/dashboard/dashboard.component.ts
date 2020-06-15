import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginWrapper } from 'src/app/model/login-wrapper';
import { AuthenticationService } from 'src/app/service/login.service';
import { log } from 'console';
import { element } from 'protractor';

@Component({
  selector: 'dashboard-app',
  templateUrl: './dashboard.component.html',
//   styleUrls: [ '../login-fiture/login.css' ]
})
export class DashboardComponent implements OnInit  {
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
    directProfile(){ 
        this.router.navigate(['profile'])
    }
}
