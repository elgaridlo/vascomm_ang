import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiturRoutingModule } from './fitur-routing.module';
import { LoginComponent } from './login-fiture/login.component';
import { FormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OTPComponent } from './OTP-fitur/otp-fitur.component';
import { UploadComponent } from './dashboard/body/upload/upload.component';
import { UploadTaskComponent } from './dashboard/body/uploader-task/upload-task.component';
import { DropzoneDirective } from './dashboard/body/dropzone.directive';
import { UpdateBioComponent } from './dashboard/body/update-bio/update-bio.component';


@NgModule({
  declarations: [LoginComponent, RegistrasiComponent, DashboardComponent, OTPComponent, UploadComponent, UploadTaskComponent, DropzoneDirective, UpdateBioComponent],
  imports: [
    CommonModule,
    FiturRoutingModule,
    FormsModule,
    NgbProgressbarModule
  ],
  exports: [
      LoginComponent, RegistrasiComponent, DashboardComponent, OTPComponent, UploadComponent, UploadTaskComponent, DropzoneDirective, UpdateBioComponent
  ]
})
export class FiturModule { }
