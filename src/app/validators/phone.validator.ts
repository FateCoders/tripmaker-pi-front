import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const phoneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value || '';
  
  if (!value) {
    return null;
  }

  const cleanedValue = value.replace(/\D/g, '');
  
  const isValidLength = cleanedValue.length === 10 || cleanedValue.length === 11;

  return isValidLength ? null : { invalidPhoneFormat: true };
};
