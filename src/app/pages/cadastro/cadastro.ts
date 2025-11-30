import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Validators, ValidatorFn } from '@angular/forms';

import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { DynamicFormComponent, FormFieldConfig } from '../../components/dynamic-form/dynamic-form';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification-service';
import { ChipButtonComponent } from '../../components/buttons/chip-button/chip-button';

import { cnpjValidator } from '../../validators/cnpj.validator';
import { phoneValidator } from '../../validators/phone.validator';
import { matchPasswordsValidator } from '../../validators/match-passwords.validator';
import { HeaderTitle } from "../../components/header-title/header-title";

interface PreferenceOption {
  label: string;
  selected: boolean;
}

interface PreferenceGroup {
  emoji: string;
  title: string;
  options: PreferenceOption[];
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DynamicFormComponent,
    MatStepperModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    ChipButtonComponent,
    HeaderTitle
],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  @ViewChild('stepper') stepper!: MatStepper;

  selectedUserType: 'traveler' | 'entrepreneur' | 'promoter' = 'traveler';
  currentFormFields: FormFieldConfig[] = [];
  currentFormGroupValidators: ValidatorFn[] = [];

  tempTravelerData: any = null;

  preferenceGroups: PreferenceGroup[] = [
    {
      emoji: '🔥',
      title: 'Estilo de Vida / Personalidade',
      options: [
        { label: 'Aventureiro', selected: false },
        { label: 'Romântico', selected: false },
        { label: 'Caseiro', selected: false },
        { label: 'Boêmio', selected: false },
        { label: 'Minimalista', selected: false },
        { label: 'Realista', selected: false },
        { label: 'Sonhador', selected: false },
        { label: 'Espiritualizado', selected: false },
        { label: 'Independente', selected: false },
        { label: 'Extrovertido', selected: false },
        { label: 'Introvertido', selected: false },
      ],
    },
    {
      emoji: '🎯',
      title: 'Interesses e Hobbies',
      options: [
        { label: 'Natureza', selected: false },
        { label: 'Viagens', selected: false },
        { label: 'Gastronomia', selected: false },
        { label: 'História', selected: false },
        { label: 'Música', selected: false },
        { label: 'Esportes', selected: false },
        { label: 'Arte', selected: false },
      ],
    },
  ];

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

  handleFormSubmit(formData: any): void {
    if (this.selectedUserType === 'traveler') {
      this.tempTravelerData = formData;
      this.stepper.next();
    } else {
      this.registerUser(formData);
    }
  }

  finishTravelerRegistration(): void {
    if (!this.tempTravelerData) return;

    const selectedPreferences = this.preferenceGroups.flatMap((group) =>
      group.options.filter((opt) => opt.selected).map((opt) => opt.label)
    );

    const finalData = {
      ...this.tempTravelerData,
      preferences: selectedPreferences,
    };

    this.registerUser(finalData);
  }

  private registerUser(userData: any): void {
    const roleMap = {
      traveler: 'viajante',
      entrepreneur: 'empreendedor',
      promoter: 'promotor_turistico',
    };

    const userToRegister = {
      ...userData,
      role: roleMap[this.selectedUserType],
    };

    delete userToRegister.confirmPassword;

    const success = this.authService.register(userToRegister);

    if (success) {
      this.notificationService.open(
        'Cadastro realizado com sucesso! Faça login para continuar.',
        'OK',
        'success'
      );
      this.router.navigate(['/']);
    } else {
      this.notificationService.open(
        'Ocorreu um erro inesperado. Por favor, tente novamente.',
        'Fechar',
        'error'
      );
    }
  }

  togglePreference(option: PreferenceOption): void {
    option.selected = !option.selected;
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
