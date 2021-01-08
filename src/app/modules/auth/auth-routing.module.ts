import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SvAuthGuardService } from './auth-services/login/sv-auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { Reg2Component } from './reg2/reg2.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: Reg2Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
