import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Form2SelectComponent } from './form2-select/form2-select.component';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { FormWizard2Component } from './form-wizard2/form-wizard2.component';
import { EJAngular2Module } from 'ej-angular2';
import { EjComponantComponent } from './ej-componant/ej-componant.component';
import { NgWizardComponent } from './ng-wizard/ng-wizard.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { NgWizard2Component } from './ng-wizard2/ng-wizard2.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { TradeEnlishmentComponent } from './trade-enlishment/trade-enlishment.component';
import { SvLoginService } from '../auth/auth-services/login/sv-login.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonGridFunctionalityComponent } from './common-grid-functionality/common-grid-functionality.component';
import { DelConfirmModalComponent } from './common-grid-functionality/del-confirm-modal/del-confirm-modal.component';
import { GridButtonDelComponent } from './common-grid-functionality/grid-button-del/grid-button-del.component';
import { PvtDelConfirmModalComponent } from './common-grid-functionality/pvt-del-confirm-modal/pvt-del-confirm-modal.component';
import { PvtDelButtonComponent } from './common-grid-functionality/pvt-del-button/pvt-del-button.component';
import { ShowTheModalComponent } from 'src/app/show-the-modal/show-the-modal.component';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import { RemoveEnterPipe } from './remove-enter.pipe';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default,
};

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Form2SelectComponent,
    FormWizardComponent,
    FormWizard2Component,
    EjComponantComponent,
    NgWizardComponent,
    NgWizard2Component,
    ChangePassComponent,
    TradeEnlishmentComponent,
    CommonGridFunctionalityComponent,
    DelConfirmModalComponent,
    GridButtonDelComponent,
    PvtDelConfirmModalComponent,
    PvtDelButtonComponent,
    ShowTheModalComponent,
    DashboardDetailsComponent,
    RemoveEnterPipe,
  ],
  imports: [
    CommonModule,
    EJAngular2Module.forRoot(),
    NgWizardModule.forRoot(ngWizardConfig),
    PagesRoutingModule,
    LayoutModule,
    ChartsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
  ],
  entryComponents: [GridButtonDelComponent],
  providers: [SvLoginService],
})
export class PagesModule {}
