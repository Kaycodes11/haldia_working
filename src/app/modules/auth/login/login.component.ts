import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SvLoginService } from '../auth-services/login/sv-login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  faCoffee,
  faEnvelope,
  faUser,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

declare var $;
declare var arrows: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  shouldShowLoader: boolean = false;
  // shouldBtnBeDisabled: boolean = false;
  // when login clicked shouldShowLoader should be true but whether token is true/false as clicked it would be false
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]),
    password: new FormControl('', Validators.required),
  });

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  faLock = faLock;
  faEnvelope = faEnvelope;
  faUser = faUser;
  constructor(
    private router: Router,
    public authObj: SvLoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('this is ngOninit');
    // statuschanges watches for valid and notvalid (based on whether applied on the formgroup or formcontrol)
    this.loginForm.statusChanges.subscribe((formStatus) => {
      console.log('formStatus: ', formStatus);
    });
  }

  // this method requires username(email) and password; with that it will validate; if credentials are right then
  // untill it goes programmatically to "members/dash" till then show a loader
  async isValidUser(loginform) {
    try {
      // validateUser requires username and password; it'll query the database to return some result
      // but before that should as login clicked shouldShowLoader = true
      let token = await this.authObj.validateUser(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      );

      console.log('TOKEN: ', token.length); // result from the validateUser
      // if token length is 0; throw an error with toastr that invalid credentials

      // token exist and it has length >= 1; then send "memebers/dash" route
      if (token.length >= 1) {
        this.shouldShowLoader = false; // right credentials
        this.toastr.success('Login Successful', 'Employee Portal');
        this.router.navigate(['/members/dash']);
        sessionStorage.setItem('username', loginform.username);
        sessionStorage.setItem(
          'user',
          JSON.stringify([
            {
              Name: token[0].Name,
              User_Name: token[0].User_Name,
              User_ID: token[0]['User_ID'],
            },
          ])
        );
      } else {
        this.shouldShowLoader = false; // failed credentials
        this.toastr.error('Login Failed', 'Employee Portal');
      }
    } catch (error) {
      this.toastr.error(`Error Occured: ${error.error}`, 'Employee Portal');
    }
  }

  // what to do when user clicked login button; then if the form isn't invalid then it'll call isValidUser method
  // which will take loginForm.value and if the credentials are right then username/email is saved within sessionstorage

  login() {
    this.shouldShowLoader = true;
    // when user clicked login button as this method runs first it would make shouldShowLoader = true; then as it goes to
    // next line within the logic is handled there about when to make should false shouldShowLoader
    if (!this.loginForm.invalid) {
      // this.shouldBtnBeDisabled = false;
      console.log(this.loginForm.value);
      this.isValidUser(this.loginForm.value); // this method require loginForm's value which is  given here
    } else if (this.loginForm.invalid) {
      console.log('valid-here?: ', this.loginForm.invalid);
      // this.shouldBtnBeDisabled = true;
      this.shouldShowLoader = false; // loader should stop if user's form field value/values is not valid
    }
  }
}
