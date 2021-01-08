import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CharecterSpace {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if (
      <String>control.value !== null &&
      (<String>control.value).indexOf(' ') !== -1
    )
      return { cannotContainSpace: true };

    return null;
  }

  static cannotContainString(
    control: AbstractControl
  ): ValidationErrors | null {
    if (<String>control.value !== null && <Number>control.value === NaN)
      return { cannotContainString: true };

    return null;
  }
}

/*
or 1 !== 1 : 1 not 1 equal to 1 : false; similarly string.indexOf(" ") !== -1 (has space then space not eq - 1 :: true)
if(str.split().length && str.split(" ").length > 1) {
console.log("has the white space")
return { shouldNotHaveWhiteSpace: true }
} else {
console.log("has not white space")
}
*/
