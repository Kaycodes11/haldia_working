import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { SettingsComponent } from './settings/settings.component';
import { SvLoginService } from '../auth/auth-services/login/sv-login.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent,
    ModalHeaderComponent,
    SettingsComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    SideNavComponent,
    ModalHeaderComponent,
    HttpClientModule,
    SettingsComponent,
  ],
  providers: [SvLoginService],
})
export class LayoutModule {}
