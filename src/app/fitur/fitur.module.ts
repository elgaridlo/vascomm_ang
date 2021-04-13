import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiturRoutingModule } from './fitur-routing.module';
import { LoginComponent } from './login-fiture/login.component';
import { FormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [LoginComponent, RegistrasiComponent, DashboardComponent],
  imports: [
    CommonModule,
    FiturRoutingModule,
    FormsModule,
    NgbProgressbarModule
  ],
  exports: [
      LoginComponent, RegistrasiComponent, DashboardComponent
  ]
})
export class FiturModule { }
