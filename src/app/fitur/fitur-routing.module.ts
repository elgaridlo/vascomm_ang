import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-fiture/login.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrasiComponent
  },
//   {
//       path: 'beranda',

//   }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiturRoutingModule { }
