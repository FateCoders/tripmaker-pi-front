import { Component } from '@angular/core';
import { DynamicFormComponent, FormFieldConfig } from "../../components/dynamic-form/dynamic-form";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [DynamicFormComponent],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {
selectedUserType: 'common' | 'entrepreneur' | 'promoter' = 'common';
  currentFormFields: FormFieldConfig[] = [];

  ngOnInit(): void {
    this.setFormFields();
  }

  selectUserType(type: 'common' | 'entrepreneur' | 'promoter'): void {
    this.selectedUserType = type;
    this.setFormFields();
  }

  private setFormFields(): void {
    switch (this.selectedUserType) {
      case 'entrepreneur':
      case 'promoter':
        this.currentFormFields = this.entrepreneurAndPromoterFields;
        break;
      case 'common':
      default:
        this.currentFormFields = this.entrepreneurAndPromoterFields;
        break;
    }
  }

  handleRegister(formData: any): void {
    console.log(`Registrando como ${this.selectedUserType}:`, formData);
    // conectar com o backend abaixo
  }


  private commonUserFields: FormFieldConfig[] = [
    { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite seu nome', validators: [Validators.required] },
    { name: 'phone', label: 'Telefone', type: 'tel', placeholder: 'Digite seu telefone', validators: [Validators.required] },
    { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha', validators: [Validators.required, Validators.minLength(8)] },
    { name: 'confirmPassword', label: 'Confirmar Senha', type: 'password', placeholder: 'Confirme sua senha', validators: [Validators.required] }
  ];

  private entrepreneurAndPromoterFields: FormFieldConfig[] = [
    { name: 'businessName', label: 'Nome do seu negócio', type: 'text', placeholder: 'Digite o nome do negócio', validators: [Validators.required] },
    { name: 'cnpj', label: 'CNPJ', type: 'text', placeholder: 'Digite o CNPJ da empresa', validators: [Validators.required] },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu email', validators: [Validators.required, Validators.email] },
    { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha', validators: [Validators.required, Validators.minLength(8)] },
    { name: 'confirmPassword', label: 'Confirmar Senha', type: 'password', placeholder: 'Confirme sua senha', validators: [Validators.required] }
  ];
}
