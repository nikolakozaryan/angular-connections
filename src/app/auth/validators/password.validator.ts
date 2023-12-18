import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    const letters = /(?=.*[a-z|A-Z])/;
    const numbers = /(?=.*\d)/;
    const symbols = /(?=.*[!@#?\]])/;

    const [validLetters, validNumbers, validSymbols] = [
      letters.test(value),
      numbers.test(value),
      symbols.test(value),
    ];

    const isRequired = value.length;
    const isShortEnough = value.length >= 8;
    const isValid = validLetters && validNumbers && validSymbols;

    if (!isRequired) {
      return { required: true };
    }

    if (!isShortEnough) {
      return { minlength: true };
    }

    if (!isValid) {
      return { passwordValue: true };
    }

    return null;
  };
}
