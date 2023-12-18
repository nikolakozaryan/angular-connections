import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regEx = /^[a-zA-Z][a-zA-Z\s]*$/;
    const { value } = control;

    const isRequired = value.length;
    const isShortEnough = value.length <= 40;
    const isValid = regEx.test(value);

    if (!isRequired) {
      return { required: true };
    }

    if (!isShortEnough) {
      return { maxlength: true };
    }

    if (!isValid) {
      return { nameValue: true };
    }

    return null;
  };
}
