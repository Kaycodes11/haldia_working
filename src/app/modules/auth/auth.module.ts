import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthComponent } from "./auth/auth.component";
import { HttpClientModule } from "@angular/common/http";
import { SvLoginService } from "./auth-services/login/sv-login.service";
import { SvRegisterService } from "./auth-services/register/sv-register.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Reg2Component } from "./reg2/reg2.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoaderComponent } from "src/app/loader/loader.component";

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    Reg2Component,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SvLoginService, SvRegisterService],
})
export class AuthModule {}
