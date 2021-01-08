import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SvAuthGuardService } from '../auth/auth-services/login/sv-auth-guard.service';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EjComponantComponent } from './ej-componant/ej-componant.component';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { FormWizard2Component } from './form-wizard2/form-wizard2.component';
import { Form2SelectComponent } from './form2-select/form2-select.component';

import { NgWizardComponent } from './ng-wizard/ng-wizard.component';
import { PagesComponent } from './pages/pages.component';
import { TradeEnlishmentComponent } from './trade-enlishment/trade-enlishment.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dash', component: DashboardComponent },
      { path: 'dash/:formNo', component: DashboardDetailsComponent },
      { path: 'form', component: Form2SelectComponent },
      { path: 'wizard', component: FormWizardComponent },
      { path: 'wizard2', component: FormWizard2Component },
      { path: 'ejtest', component: EjComponantComponent },
      { path: 'profile', component: NgWizardComponent },
      { path: 'changepass', component: ChangePassComponent },
      { path: 'tradereg', component: TradeEnlishmentComponent },
      { path: '', component: DashboardComponent },
    ],
    canActivate: [SvAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
