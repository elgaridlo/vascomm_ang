import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/login.service';

@Component({
  selector: 'dashboard-app',
  templateUrl: './dashboard.component.html',
//   styleUrls: [ '../login-fiture/login.css' ]
})
export class DashboardComponent implements OnInit  {
    alert: boolean;
    loginData: any;

    message: string;
    admin: boolean;

    validasiData: boolean;
    currentUri: string;
    currentUrl: string;

    item: any;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public authentication: AuthenticationService
        ){
            this.currentUri = this.router.url;
            this.currentUrl = this.router.url.split('?')[0];
            this.loginData = this.router.getCurrentNavigation().extras.state;
            if (!this.loginData) {
                this.router.navigate([''])
            }
        }
    
    async ngOnInit(){
        this.alert = false;
        if(this.loginData.role === 'admin') {
            this.admin = true;
            this.message = 'You are an admin!'
            this.getAllData();
        } else {
            this.admin = false;
            this.message = 'You are not an admin!'
        }
    }
    getAllData () {
        this.authentication.getAll().subscribe(
            res => {
                this.item = res
            }
        )
    }
}
