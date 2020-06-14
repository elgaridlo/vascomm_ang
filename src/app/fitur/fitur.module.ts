import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiturRoutingModule } from './fitur-routing.module';
import { LoginComponent } from './login-fiture/login.component';
import { FormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FiturRoutingModule,
    FormsModule,
    NgbProgressbarModule
  ],
  exports: [
      LoginComponent
  ]
})
export class FiturModule { }
