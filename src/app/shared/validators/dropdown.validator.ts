import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DropDownValidators {

  static selected(autoSelectText: string): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (!c.value || c.value === '' || c.value === autoSelectText) {
        return { notSelected: true };
      }
      return null;
    };
  }
}
