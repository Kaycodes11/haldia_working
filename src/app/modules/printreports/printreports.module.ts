import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintreportsComponent } from './printreports/printreports.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SvAuthGuardService } from '../auth/auth-services/login/sv-auth-guard.service';

const routes = [
  {
    path: '',
    component: PrintreportsComponent,
    canActivate: [SvAuthGuardService],
  },
];

@NgModule({
  declarations: [PrintreportsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class PrintreportsModule {}
