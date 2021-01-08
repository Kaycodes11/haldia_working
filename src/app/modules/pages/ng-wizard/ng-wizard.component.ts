import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { Iuser } from '../../auth/models/iuser';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {
  NgWizardConfig,
  NgWizardService,
  StepChangedArgs,
  StepValidationArgs,
  STEP_STATE,
  THEME,
} from 'ng-wizard';
import { SvProfileService } from '../page-service/profile/sv-profile.service';
import { isUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ng-wizard',
  templateUrl: './ng-wizard.component.html',
  styleUrls: ['./ng-wizard.component.scss'],
})
export class NgWizardComponent implements OnInit {
  public def: any;
  public userObj: Iuser[];
  public userProfileObj: Iuser;
  public userProfileObjSummary: Iuser;
  idproofs: any = [];
  emailGlobal: string = sessionStorage.getItem('username');
  saveImageName: string = '';
  saveImageBase64: string = '';
  encodeImageObject = {};
  shouldAttachmentViewerModalOpen: boolean;

  userInfoForm = new FormGroup({
    UserType: new FormControl({ value: '', disabled: true }),
    Name: new FormControl({ value: '', disabled: true }),
    ComapnyName: new FormControl({ value: '', disabled: true }),
    EmailId: new FormControl({ value: '', disabled: true }),
    MobileNo: new FormControl({ value: '', disabled: true }),
    DOB: new FormControl('', Validators.required),
    Gender: new FormControl('', Validators.required),
  });

  addressForm = new FormGroup({
    Road_Name: new FormControl('', Validators.required),
    Locality_Name: new FormControl('', Validators.required),
    District: new FormControl('', Validators.required),
    State: new FormControl('', Validators.required),
    Pin_Code: new FormControl('', Validators.required),
  });

  PersonalIdentityForm = new FormGroup({
    IDProof_Name: new FormControl('', Validators.required),
    IDProof_Number: new FormControl('', Validators.required),
    IDProofFile_Path: new FormControl(''),
  });

  onFileUpload(event) {
    // user can view just one file at a time; so as user upload the file, save it within property & then
    // take event.target.files[0].name to show within a global property & save base64 to another global property
    console.log('event-profile: ', event.target.files[0].name);
    this.saveImageName = event.target.files[0].name; // so here it'll hold image name as string value
    this.makeBase64Image(event.target.files[0]); // makeBase64Image needs the uploaded file as argument
    this.encodeImageObject = {
      ...this.encodeImageObject,
      name: event.target.files[0].name,
    };

    // now just go to step; put the template and bind these two values from saveImageName and saveImageBase64
    // go to template step id_proof; to go to next step it should've saveImageName existing
  }

  makeBase64Image(file: File) {
    const obserable = new Observable((subscriber: Subscriber<any>) => {
      // call the method which will take the file from here and make it base64 alongn with subscriber
      this.readFile(file, subscriber);
    });
    obserable.subscribe((responseBase64) => {
      this.saveImageBase64 = responseBase64;
      this.encodeImageObject = {
        ...this.encodeImageObject,
        file: responseBase64,
      };
      console.log('BASE: ', typeof responseBase64);
      console.log('encodeObj: ', this.encodeImageObject);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };
    fileReader.onabort = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  showModal() {
    this.shouldAttachmentViewerModalOpen = true;
  }

  closeModal(event) {
    this.shouldAttachmentViewerModalOpen = false;
  }

  userSummary = new FormGroup({
    UserType: new FormControl({ value: '', disabled: true }),
    Name: new FormControl({ value: '', disabled: true }),
    ComapnyName: new FormControl({ value: '', disabled: true }),
    EmailId: new FormControl({ value: '', disabled: true }),
    MobileNo: new FormControl({ value: '', disabled: true }),
    DOB: new FormControl({ value: '', disabled: true }),
    Gender: new FormControl({ value: '', disabled: true }),
    Road_Name: new FormControl({ value: '', disabled: true }),
    Locality_Name: new FormControl({ value: '', disabled: true }),
    District: new FormControl({ value: '', disabled: true }),
    State: new FormControl({ value: '', disabled: true }),
    Pin_Code: new FormControl({ value: '', disabled: true }),
    IDProof_Name: new FormControl({ value: '', disabled: true }),
    IDProof_Number: new FormControl({ value: '', disabled: true }),
  });

  get UserType() {
    return this.userInfoForm.get('UserType');
  }

  get Name() {
    return this.userInfoForm.get('Name');
  }
  get CompanyName() {
    return this.userInfoForm.get('CompanyName');
  }
  get EmailId() {
    return this.userInfoForm.get('EmailId');
  }
  get MobileNo() {
    return this.userInfoForm.get('MobileNo');
  }
  get DOB() {
    return this.userInfoForm.get('DOB');
  }
  get Gender() {
    return this.userInfoForm.get('Gender');
  }

  get Road_Name() {
    return this.addressForm.get('Road_Name');
  }
  get Locality_Name() {
    return this.addressForm.get('Locality_Name');
  }

  get District() {
    return this.addressForm.get('District');
  }
  get State() {
    return this.addressForm.get('State');
  }
  get Pin_Code() {
    return this.addressForm.get('Pin_Code');
  }
  get IDProof_Name() {
    return this.PersonalIdentityForm.get('IDProof_Name');
  }
  get IDProof_Number() {
    return this.PersonalIdentityForm.get('IDProof_Number');
  }
  get IDProofFile_Path() {
    return this.PersonalIdentityForm.get('IDProofFile_Path');
  }

  // summary

  get UserTypeSummary() {
    return this.userSummary.get('UserType');
  }

  get NameSummary() {
    return this.userSummary.get('Name');
  }
  get CompanyNameSummary() {
    return this.userSummary.get('CompanyName');
  }
  get EmailIdSummary() {
    return this.userSummary.get('EmailId');
  }
  get MobileNoSummary() {
    return this.userSummary.get('MobileNo');
  }
  get DOBSummary() {
    return this.userSummary.get('DOB');
  }
  get GenderSummary() {
    return this.userSummary.get('Gender');
  }

  get Road_NameSummary() {
    return this.userSummary.get('Road_Name');
  }
  get Locality_NameSummary() {
    return this.userSummary.get('Locality_Name');
  }

  get DistrictSummary() {
    return this.userSummary.get('District');
  }
  get StateSummary() {
    return this.userSummary.get('State');
  }
  get Pin_CodeSummary() {
    return this.userSummary.get('Pin_Code');
  }
  get IDProof_NameSummary() {
    return this.userSummary.get('IDProof_Name');
  }
  get IDProof_NumberSummary() {
    return this.userSummary.get('IDProof_Number');
  }

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: 'Finish',
          class: 'btn btn-info',
          event: () => {
            this.profileSubmit();
          },
        },
      ],
    },
  };
  constructor(
    private ngWizardService: NgWizardService,
    private toastr: ToastrService,
    private router: Router,
    public proObj: SvProfileService
  ) {
    this.def = '0';
    this.userInfoForm.controls['UserType'].setValue(this.def, {
      onlySelf: true,
    });
    this.userInfoForm.controls['Gender'].setValue(1, { onlySelf: true });

    this.userSummary.controls['UserType'].setValue(this.def, {
      onlySelf: true,
    });
    this.userSummary.controls['Gender'].setValue(1, { onlySelf: true });
  }

  async getUserProfile(username) {
    try {
      let result = await this.proObj.getUserProfile(username);
      if (result[0].CODE === 1) {
        this.userObj = result;

        this.getIdProofBind(this.userObj[0].UserType);

        this.userInfoForm.patchValue({
          UserType: this.userObj[0].UserType,
          Name: this.userObj[0].Name,
          ComapnyName: this.userObj[0].CompanyName,
          EmailId: this.userObj[0].EmailId,
          MobileNo: this.userObj[0].MobileNo,
          DOB: this.userObj[0].DOB,
          Gender: this.userObj[0].Gender,
        });

        this.addressForm.patchValue({
          Road_Name: this.userObj[0].Road_Name,
          Locality_Name: this.userObj[0].Locality_Name,
          District: this.userObj[0].District,
          State: this.userObj[0].State,
          Pin_Code: this.userObj[0].Pin_Code,
        });

        this.PersonalIdentityForm.patchValue({
          IDProof_Name: this.userObj[0].IDProof_Name,
          IDProof_Number: this.userObj[0].IDProof_Number,
          //IDProofFile_Path: this.userObj[0].IDProofFile_Path
        });

        console.log('NAME: ', this.userInfoForm.get('Name').value);

        console.log('result from', this.idproofs);
      } else {
      }
    } catch (error) {
      console.log('Error Occured', error);
    }
  }

  async getIdProofBind(User_Type) {
    let result = await this.proObj.getIDProffBind(User_Type);
    this.idproofs = result;
  }

  async populateSummary() {
    try {
      if (
        !this.userInfoForm.invalid &&
        this.addressForm &&
        this.PersonalIdentityForm
      ) {
        let username = sessionStorage.getItem('username');

        let result = await this.proObj.getUserProfile(username);
        if (result[0].CODE === 1) {
          this.userObj = result;

          this.userProfileObjSummary = {
            DOB: this.userInfoForm.value.DOB,
            Gender: this.userInfoForm.value.Gender,
            Road_Name: this.addressForm.value.Road_Name,
            Locality_Name: this.addressForm.value.Locality_Name,
            District: this.addressForm.value.District,
            State: this.addressForm.value.State,
            Pin_Code: this.addressForm.value.Pin_Code,
            IDProof_Name: this.PersonalIdentityForm.value.IDProof_Name,
            IDProof_Number: this.PersonalIdentityForm.value.IDProof_Number,
            IDProofFile_Path: this.PersonalIdentityForm.value.IDProofFile_Path,
            E_Cityzen_ID: 0,
            UserType: this.userObj[0].UserType,
            Name: this.userObj[0].Name,
            CompanyName: this.userObj[0].CompanyName,
            EmailId: username,
            MobileNo: this.userObj[0].MobileNo,
            Password: '',
            HashMap: '',
            OTP: '',
            IS_Active: 'Y',
          };
        }

        this.userSummary.patchValue({
          UserType: this.userProfileObjSummary.UserType,
          Name: this.userProfileObjSummary.Name,
          ComapnyName: this.userProfileObjSummary.CompanyName,
          EmailId: this.userProfileObjSummary.EmailId,
          MobileNo: this.userProfileObjSummary.MobileNo,
          DOB: this.userProfileObjSummary.DOB,
          Gender: this.userProfileObjSummary.Gender,
          Road_Name: this.userProfileObjSummary.Road_Name,
          Locality_Name: this.userProfileObjSummary.Locality_Name,
          District: this.userProfileObjSummary.District,
          State: this.userProfileObjSummary.State,
          Pin_Code: this.userProfileObjSummary.Pin_Code,
          IDProof_Name: this.userProfileObjSummary.IDProof_Name,
          IDProof_Number: this.userProfileObjSummary.IDProof_Number,
        });
      } else {
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  async profileSubmit() {
    try {
      if (
        !this.userInfoForm.invalid &&
        this.addressForm &&
        this.PersonalIdentityForm
      ) {
        let username = sessionStorage.getItem('username');

        this.userProfileObj = {
          DOB: this.userInfoForm.value.DOB,
          Gender: this.userInfoForm.value.Gender,
          Road_Name: this.addressForm.value.Road_Name,
          Locality_Name: this.addressForm.value.Locality_Name,
          District: this.addressForm.value.District,
          State: this.addressForm.value.State,
          Pin_Code: this.addressForm.value.Pin_Code,
          IDProof_Name: this.PersonalIdentityForm.value.IDProof_Name,
          IDProof_Number: this.PersonalIdentityForm.value.IDProof_Number,
          IDProofFile_Path: this.PersonalIdentityForm.value.IDProofFile_Path,
          E_Cityzen_ID: 0,
          UserType: '',
          Name: '',
          CompanyName: '',
          EmailId: username,
          MobileNo: '',
          Password: '',
          HashMap: '',
          OTP: '',
          IS_Active: 'Y',
        };

        let response = await this.proObj.updateProfile(this.userProfileObj);
        console.log('result', response);

        if (response[0].CODE === 1) {
          //Start file upload process

          // const idProof = new FormGroup({
          //   picfile: new FormControl('')
          //   , picpath: new FormControl('')
          // });

          // let controls = <FormArray>this.userInfoForm.controls.IDProofFile_Path;
          // controls.push(idProof);
          //Start file upload process

          this.toastr.success(
            'Profile updated successfully',
            'Employee Portal'
          );
          this.router.navigate(['/members/dash']);
        } else {
          this.toastr.error('Profile updation failed', 'Employee Portal');
        }
      } else {
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  ngOnInit() {
    let username = sessionStorage.getItem('username');
    this.getUserProfile(username);
  }
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

  isValidTypeBoolean: boolean = true;
  isValidTypeBoolean2: boolean = false;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    if (!this.userInfoForm.invalid) {
      this.isValidTypeBoolean2 = true;
      return true;
    } else {
      this.isValidTypeBoolean2 = false;
      return false;
    }
  }

  isValidFunctionAddress(args: StepValidationArgs) {
    if (!this.addressForm.invalid) {
      return true;
    } else {
      return false;
    }
  }

  isValidFunctionPersonalIdentity(args: StepValidationArgs) {
    if (!this.PersonalIdentityForm.invalid) {
      // when this form is not invalid but then if one of these properties are false then restrict else populateSummary()
      if (!this.saveImageName || !this.saveImageBase64) {
        this.toastr.error('Must upload the image', 'Citizen Portal');
        return false; // return won't allow futher execution of code if the block is matched
      }
      this.populateSummary();
      return true;
    } else {
      return false;
    }
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }
}
