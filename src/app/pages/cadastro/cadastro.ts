import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from '../../components/dynamic-form/dynamic-form';
import { Validators, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { NotificationService } from '../../services/notification-service';

import { cnpjValidator } from '../../validators/cnpj.validator';
import { phoneValidator } from '../../validators/phone.validator';
import { matchPasswordsValidator } from '../../validators/match-passwords.validator';

@Component({
  selector: 'app-cadastro',
  imports: [DynamicFormComponent, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  selectedUserType: 'traveler' | 'entrepreneur' | 'promoter' = 'traveler';
  currentFormFields: FormFieldConfig[] = [];
  currentFormGroupValidators: ValidatorFn[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userTypeFromRoute = params['tipo'];

      if (['entrepreneur', 'promoter'].includes(userTypeFromRoute)) {
        this.selectedUserType = userTypeFromRoute;
      } else {
        this.selectedUserType = 'traveler';
      }
      this.setFormFields();
    });
  }

  private setFormFields(): void {
    if (this.selectedUserType === 'traveler') {
      this.currentFormFields = this.travelerFields;
    } else {
      this.currentFormFields = this.entrepreneurAndPromoterFields;
    }
    this.currentFormGroupValidators = [matchPasswordsValidator];
  }

  handleRegister(formData: any): void {
    const roleMap = {
      traveler: 'viajante',
      entrepreneur: 'empreendedor',
      promoter: 'promotor-turistico',
    };

    const userToRegister = {
      ...formData,
      role: roleMap[this.selectedUserType],
    };

    delete userToRegister.confirmPassword;

    const success = this.authService.register(userToRegister);

    if (success) {
      this.notificationService.open('Cadastro realizado com sucesso! Redirecionando para o login.', 'OK', 'success');
      this.router.navigate(['/']); 
    } else {
      this.notificationService.open('Ocorreu um erro inesperado. Por favor, tente novamente.', 'Fechar', 'error');
    }
  }

  private travelerFields: FormFieldConfig[] = [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      placeholder: 'Digite seu nome',
      validators: [Validators.required],
      validationMessages: [{ type: 'required', message: 'O nome é obrigatório.' }],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Digite seu email',
      validators: [Validators.required, Validators.email],
      validationMessages: [
        { type: 'required', message: 'O email é obrigatório.' },
        { type: 'email', message: 'Por favor, insira um email válido.' },
      ],
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'tel',
      placeholder: '(XX) XXXXX-XXXX',
      mask: '(00) 00000-0000', 
      validators: [Validators.required, phoneValidator],
      validationMessages: [
        { type: 'required', message: 'O telefone é obrigatório.' },
        { type: 'invalidPhoneFormat', message: 'Por favor, insira um telefone válido.' },
      ],
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha',
      validators: [Validators.required, Validators.minLength(8)],
      validationMessages: [
        { type: 'required', message: 'A senha é obrigatória.' },
        { type: 'minlength', message: 'A senha deve ter no mínimo 8 caracteres.' },
      ],
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Senha',
      type: 'password',
      placeholder: 'Confirme sua senha',
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'A confirmação de senha é obrigatória.' },
        { type: 'mustMatch', message: 'As senhas não coincidem.' },
      ],
    },
  ];

  private entrepreneurAndPromoterFields: FormFieldConfig[] = [
    {
      name: 'businessName',
      label: 'Nome do seu negócio',
      type: 'text',
      placeholder: 'Digite o nome do negócio',
      validators: [Validators.required],
      validationMessages: [{ type: 'required', message: 'O nome do negócio é obrigatório.' }],
    },
    {
      name: 'cnpj',
      label: 'CNPJ',
      type: 'text',
      placeholder: 'XX.XXX.XXX/XXXX-XX',
      mask: '00.000.000/0000-00', 
      validators: [Validators.required, cnpjValidator],
      validationMessages: [
        { type: 'required', message: 'O CNPJ é obrigatório.' },
        { type: 'invalidCnpj', message: 'Por favor, insira um CNPJ válido.' },
      ],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Digite seu email',
      validators: [Validators.required, Validators.email],
      validationMessages: [
        { type: 'required', message: 'O email é obrigatório.' },
        { type: 'email', message: 'Por favor, insira um email válido.' },
      ],
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha',
      validators: [Validators.required, Validators.minLength(8)],
      validationMessages: [
        { type: 'required', message: 'A senha é obrigatória.' },
        { type: 'minlength', message: 'A senha deve ter no mínimo 8 caracteres.' },
      ],
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Senha',
      type: 'password',
      placeholder: 'Confirme sua senha',
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'A confirmação de senha é obrigatória.' },
        { type: 'mustMatch', message: 'As senhas não coincidem.' },
      ],
    },
  ];
}