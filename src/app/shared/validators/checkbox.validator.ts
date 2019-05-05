import { AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

export class CheckboxValidators {

  static selected(formArray: FormArray): ValidatorFn {


    return (c: AbstractControl): { [key: string]: boolean } | null => {
      for (let i = 0; i < formArray.length; i++) {
        if (formArray.at(i).value.required && !formArray.at(i).value.checked ) {
          return { notChecked: true };
        }
      }

      return null;
    };

    // const controls = formArray.controls;

    // for (let i = 0; i < controls.length; i++) {
    //   if (!controls[i].value && this.documents[i].isMandatory) {
    //     return { notChecked: true };
    //   }
    // }
    return null;
  }
}



// private mandatorymustbechecked() {
//   const validator: ValidatorFn = (formArray: FormArray) => {
//     let controls = formArray.controls;

//     for (let i = 0; i < controls.length; i++) {
//       if (!controls[i].value && this.documents[i].isMandatory)
//         return { NotChecked: true };
//     }
//     return null;
//   };

//   return validator;
// }
