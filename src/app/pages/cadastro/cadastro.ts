import { Component, inject } from '@angular/core';
import { DynamicFormComponent, FormFieldConfig } from '../../components/dynamic-form/dynamic-form';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [DynamicFormComponent],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  private route = inject(ActivatedRoute);

  selectedUserType: 'traveler' | 'entrepreneur' | 'promoter' = 'traveler';
  profileTitle = 'Viajante';
  currentFormFields: FormFieldConfig[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userTypeFromRoute = params['tipo'];

      if (userTypeFromRoute === 'entrepreneur' || userTypeFromRoute === 'promoter') {
        this.selectedUserType = userTypeFromRoute;
      } else {
        this.selectedUserType = 'traveler';
      }

      this.setFormFields();
    });
  }

  selectUserType(type: 'traveler' | 'entrepreneur' | 'promoter'): void {
    this.selectedUserType = type;
    this.setFormFields();
  }

  private setFormFields(): void {
    switch (this.selectedUserType) {
      case 'entrepreneur':
        this.profileTitle = 'Empreendedor Local';
        this.currentFormFields = this.entrepreneurAndPromoterFields;
        break;
      case 'promoter':
        this.profileTitle = 'Promotor Turístico';
        this.currentFormFields = this.entrepreneurAndPromoterFields;
        break;
      case 'traveler':
      default:
        this.profileTitle = 'Viajante';
        this.currentFormFields = this.travelerFields;
        break;
    }
  }

  handleRegister(formData: any): void {
    console.log(`Registrando como ${this.selectedUserType}:`, formData);
    // conectar com o backend abaixo
  }

  private travelerFields: FormFieldConfig[] = [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      placeholder: 'Digite seu nome',
      validators: [Validators.required],
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'tel',
      placeholder: 'Digite seu telefone',
      validators: [Validators.required],
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha',
      validators: [Validators.required, Validators.minLength(8)],
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Senha',
      type: 'password',
      placeholder: 'Confirme sua senha',
      validators: [Validators.required],
    },
  ];

  private entrepreneurAndPromoterFields: FormFieldConfig[] = [
    {
      name: 'businessName',
      label: 'Nome do seu negócio',
      type: 'text',
      placeholder: 'Digite o nome do negócio',
      validators: [Validators.required],
    },
    {
      name: 'cnpj',
      label: 'CNPJ',
      type: 'text',
      placeholder: 'Digite o CNPJ da empresa',
      validators: [Validators.required],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Digite seu email',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha',
      validators: [Validators.required, Validators.minLength(8)],
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Senha',
      type: 'password',
      placeholder: 'Confirme sua senha',
      validators: [Validators.required],
    },
  ];
}
