import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Iuser } from '../models/iuser';
import { SvRegisterService } from '../auth-services/register/sv-register.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  faCoffee,
  faEnvelope,
  faUser,
  faLock,
  faMobile,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CharecterSpace } from 'src/app/common/validators/space/charecter-space';
import * as _ from 'lodash';

declare var $; // jquery import
declare var arrows: any;

@Component({
  selector: 'app-reg2',
  templateUrl: './reg2.component.html',
  styleUrls: ['./reg2.component.scss'],
})
export class Reg2Component implements OnInit {
  public userObj: Iuser;
  public def: any;

  Reg2Form = new FormGroup({
    UserType: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    CompanyName: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    HashMap: new FormControl(''),
    Password: new FormControl(''),
    OTP: new FormControl(''),
    EmailId: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        CharecterSpace.cannotContainSpace,
      ],
      this.shouldbeUnique()
    ),
    MobileNo: new FormControl('', [
      Validators.maxLength(10),
      Validators.required,
      Validators.minLength(10),
      CharecterSpace.cannotContainSpace,
    ]),
  });

  get UserType() {
    return this.Reg2Form.get('UserType');
  }

  get Name() {
    return this.Reg2Form.get('Name');
  }
  get CompanyName() {
    return this.Reg2Form.get('CompanyName');
  }
  get EmailId() {
    return this.Reg2Form.get('EmailId');
  }
  get MobileNo() {
    return this.Reg2Form.get('MobileNo');
  }

  faLock = faLock;
  faPen = faPen;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faMobile = faMobile;

  constructor(
    private router: Router,
    public authObj: SvRegisterService,
    private toastr: ToastrService
  ) {
    //Set Dropdown value
    this.def = '0';
    this.Reg2Form.controls['UserType'].setValue(this.def, { onlySelf: true });
  }

  public txtOTP: String;
  ngOnInit(): void {}

  alertWithSuccess() {
    let otp = sessionStorage.getItem('otp');

    if (otp === this.txtOTP) {
      Swal.fire(
        'Thank you...',
        'Login password has been sent to your Email Id!',
        'success'
      );

      this.router.navigate(['/members/dash']);
    } else {
      Swal.fire('Error', 'Wrong OTP provided', 'error');
    }

    this.txtOTP = '';
  }

  Reg2() {
    //const lengthOfCode = 40;
    //let hashmap = this.makeRandom(lengthOfCode, possible);
    // console.log(hashmap);
    if (!this.Reg2Form.invalid) {
      // this.userObj.FirstName = this.Reg2Form.value.FirstName;
      // this.userObj.MiddleName = this.Reg2Form.value.MiddleName;
      // this.userObj.LastName = this.Reg2Form.value.LastName;
      // this.userObj.FullName = this.Reg2Form.value.FullName;
      // this.userObj.EmailId = this.Reg2Form.value.EmailId;
      // this.userObj.MobileNo = this.Reg2Form.value.MobileNo;
      // this.userObj.Password = this.makeRandom(8, passwordPossible);
      // this.userObj.HashMap = this.makeRandom(12, hashmapPossible);
      // this.userObj.OTP = this.makeRandom(4, otpPossible);
      //this.sendUser(this.userObj);
      //console.log(this.userObj);
      this.sendUser(
        _.pick(this.Reg2Form.value, [
          'UserType',
          'Name',
          'CompanyName',
          'EmailId',
          'MobileNo',
        ])
      );
    }
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async sendUser(userObj: Iuser) {
    try {
      //
      let dbStatus = await this.authObj.registeruser(userObj);

      console.log(dbStatus['body'][0].CODE);

      if (dbStatus['body'][0].CODE === 1) {
        sessionStorage.setItem('otp', dbStatus['body'][0].Reg_OTP as string);

        console.log(dbStatus['body'][0].Reg_OTP);
        let pass = sessionStorage.getItem('passnothashed');
        this.toastr.success(
          `Record with the name of  ${dbStatus['body'][0].Name} saved successfully and your OTP is ${dbStatus['body'][0].Reg_OTP} and your temporary password is ${pass}`,
          'Employee Portal'
        );
      } else {
        this.toastr.error(
          `Error Occured:  ${dbStatus['body'][0].MSG}`,
          'Employee Portal'
        );
      }

      this.Reg2Form.reset();
    } catch (error) {
      this.toastr.error(`Error Occured:  ${error}`, 'Employee Portal');
      //console.error('Error Occured', error);
    }
  }

  shouldbeUnique(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve, reject) => {
        this.authObj.getUniqueUsername(<String>control.value).then(
          (res) => {
            //console.log('inside promise',res);
            if (!res) {
              resolve({ emailNotAvailable: true });
            } else {
              resolve(null);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    };
  }

  changeUserType() {
    try {
      let utype = _.pick(this.Reg2Form.value, ['UserType']);
      console.log('changed...', utype);
      if (utype.UserType === '1') {
        this.Reg2Form.get('CompanyName').enable();
      } else {
        this.Reg2Form.get('CompanyName').disable();
      }
    } catch (error) {}
  }
}
