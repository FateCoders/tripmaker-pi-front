import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPasswordsValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
    return null; 
  }

  if (passwordControl.value !== confirmPasswordControl.value) {
    confirmPasswordControl.setErrors({ mustMatch: true });
    return { passwordsNotMatch: true }; 
  } else {
    if (confirmPasswordControl.errors && confirmPasswordControl.errors['mustMatch']) {
      const { mustMatch, ...restErrors } = confirmPasswordControl.errors;
      confirmPasswordControl.setErrors(Object.keys(restErrors).length ? restErrors : null);
    }
    return null;
  }
};
