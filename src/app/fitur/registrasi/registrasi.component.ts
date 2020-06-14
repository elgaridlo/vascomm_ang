import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginWrapper } from 'src/app/model/login-wrapper';
import { AuthenticationService } from 'src/app/service/login.service';
import { log } from 'console';

@Component({
  selector: 'registrasi-app',
  templateUrl: './registrasi.component.html',
//   styleUrls: [ './login.css' ]
})
export class RegistrasiComponent implements OnInit  {
    alert: boolean;
    login = new LoginWrapper();
  
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
            let data = this.router.getCurrentNavigation().extras.state;
            if (!data) {
                this.router.navigate([''])
            } else {
                this.login.phoneNumber = data.phoneNumber;
                this.login.password = data.password;
            }
        }
    
    async ngOnInit(){
        this.alert = false;
        console.log(this.login)
     
        // console.log(window.)
    }
}
