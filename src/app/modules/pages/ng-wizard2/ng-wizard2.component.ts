import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormBuilder, Validators ,FormGroup,FormControl} from '@angular/forms';
@Component({
  selector: 'app-ng-wizard2',
  templateUrl: './ng-wizard2.component.html',
  styleUrls: ['./ng-wizard2.component.scss']
})
export class NgWizard2Component implements OnInit {

  formStep1 = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  formStep2 = new FormGroup({
    address: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required)
  });
  

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ],
    }
  };
  constructor(private ngWizardService: NgWizardService,public frmb: FormBuilder) {
  }

  loadWizard(){

    // for (let item in this.controlsConfig) {
    //   this.formGroups[item] = this.frmb.group(this.controlsConfig[item]);
    // }

  }

  ngOnInit(): void {
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

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

}
