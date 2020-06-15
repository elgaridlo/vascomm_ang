import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginWrapper } from 'src/app/model/login-wrapper';
import { AuthenticationService } from 'src/app/service/login.service';
import { log } from 'console';
import { element } from 'protractor';
import { BioWrapper } from 'src/app/model/bio.-wrapper';
import { BioUserService } from 'src/app/service/bio-user.service';

@Component({
  selector: 'update-bio-app',
  templateUrl: './update-bio.component.html',
  styleUrls: [ './bio.css' ]
})
export class UpdateBioComponent implements OnInit  {
    alert: boolean;
    login = new LoginWrapper();
    
    loading: boolean = false;

    dataBio: BioWrapper;
    
    phoneNumber: string;
    message: string;
    disable: boolean = true;

    validasiData: boolean;
    currentUri: string;
    currentUrl: string;

    sekolah: string;
    umur: string;
    alamat: string;
    pekerjaan: string;

    flag: number;

    lengkapData = [];

    createButton: boolean = true;
    editButton: boolean = false;
    saveButton: boolean = true;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public db: AngularFirestore,
        public bioService: BioUserService
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
        this.login.phoneNumber = '12312312321'
        this.flag = 0;
        this.checkBio()
    }

    checkBio() {
        let dataBio = [];
        this.bioService.displayBio().subscribe(
            x => {
                this.checkData(this.login.phoneNumber, x);
            }
        )
    }

    checkData(phoneNumber, params) {
        let data = [];
        let kaki;
        let id;
        let isi = [];
        params.map(
            c => {
                const getData = c.payload.doc.data();
                const getId = c.payload.doc.id;
                console.log('getDaata = ', getData)
                data.push(getData)
            }
        )
        console.log('isisisisi  === ', isi)
        for (kaki of data) {
            console.log('data = ', kaki['phoneNumber'] === phoneNumber)
            if(data['phoneNumber'] === phoneNumber) {
                this.flag = 1;
                this.isiData(kaki)
                // this.save(this.flag)
                break;
            } else {
                this.flag = 0;
            }
        }
        // this.save(this.flag)
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

    edit () {
        this.disable = false;
        this.saveButton = false;
    }
    saveDo() {
        
    }
    save (flag) {
        this.dataBio = new BioWrapper();
        this.dataBio.alamat = this.alamat;
        this.dataBio.bekerja = this.pekerjaan;
        this.dataBio.phoneNumber = this.login.phoneNumber;
        this.dataBio.sekolah = this.sekolah;
        this.dataBio.umur = this.umur;

        console.log('flagggging = ', flag)
        if(flag === 1) {
            // this.bioService.updateBio('id', this.dataBio)
        } else {
            this.bioService.createUserBio(this.dataBio);
        }
    }
    isiData (dataBio) {
        console.log('dataBio = =' ,dataBio)
        this.alamat = dataBio['alamat']
        this.sekolah = dataBio['sekolah']
        this.umur = dataBio['umur']
        this.pekerjaan = dataBio['pekerjaan']
    }
}
