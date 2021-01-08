import { AbstractControl, ValidationErrors } from '@angular/forms';
// ["+", "-", "*", "/", "."]
export class NumberValidators {
  static isNumberCheck(control: AbstractControl): ValidationErrors | null {
    console.log('control value', Number(<String>control.value));
    // <String> control.value should be of string type (type casting)
    // on whichever field it would be applided if that's not null & isNaN() then return the object else null
    if (<String>control.value !== null && isNaN(Number(<String>control.value)))
      return { notNumeric: true };
    // if (
    //   <String>control.value.includes('-') ||
    //   <String>control.value.includes('+') ||
    //   <String>control.value.includes('.') ||
    //   <String>control.value.includes('*') ||
    //   <String>control.value.includes('/')
    // )
    //   return { justNumber: true };
    return null;
  }
}
