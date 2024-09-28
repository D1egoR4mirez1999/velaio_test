import { FormArray, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function isPersonInvalid(personSkills: FormArray): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    let isPersonInvalid = false;
    for (let index = 0; index < personSkills.controls.length - 1; index++) {
      const element = personSkills.controls[index];

      if (element.value === value) {
        isPersonInvalid = true;
      }
    }
    return isPersonInvalid ? { isPersonInvalid: true } : null;;
  };
}