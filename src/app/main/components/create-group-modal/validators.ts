import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function groupNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regEx = /^[a-zA-Z\s\d]*$/;
    const { value } = control;

    const isRequired = value.length;
    const isShortEnough = value.length <= 30;
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
