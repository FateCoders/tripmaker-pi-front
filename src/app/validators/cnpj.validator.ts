import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidCNPJ } from '../utils/cnpj-utils';

export const cnpjValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  
  if (!value) {
    return null;
  }

  return isValidCNPJ(value) ? null : { invalidCnpj: true };
};
