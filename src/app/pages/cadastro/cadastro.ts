import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DynamicFormComponent, FormFieldConfig } from '../../components/dynamic-form/dynamic-form';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  imports: [DynamicFormComponent, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  selectedUserType: 'traveler' | 'entrepreneur' | 'promoter' = 'traveler';
  currentFormFields: FormFieldConfig[] = [];

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
  }

  handleRegister(formData: any): void {
    const roleMap = {
      traveler: 'viajante',
      entrepreneur: 'empreendedor',
      promoter: 'promotor-turistico'
    };

    const userToRegister = {
      ...formData,
      role: roleMap[this.selectedUserType]
    };
    
    // Remove o campo de confirmação de senha antes de "salvar"
    delete userToRegister.confirmPassword;

    this.authService.register(userToRegister);
    this.router.navigate(['/']); // Redireciona para a página de login
  }

  private travelerFields: FormFieldConfig[] = [
    { 
      name: 'name', 
      label: 'Nome', 
      type: 'text', 
      placeholder: 'Digite seu nome', 
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'O nome é obrigatório.' }
      ]
    },
    { 
      name: 'email', 
      label: 'Email', 
      type: 'email', 
      placeholder: 'Digite seu email', 
      validators: [Validators.required, Validators.email],
      validationMessages: [
        { type: 'required', message: 'O email é obrigatório.' },
        { type: 'email', message: 'Por favor, insira um email válido.' }
      ]
    },
    { 
      name: 'phone', 
      label: 'Telefone', 
      type: 'tel', 
      placeholder: 'Digite seu telefone', 
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'O telefone é obrigatório.' }
        // TODO: Adicionar validação para formato de telefone.
      ]
    },
    { 
      name: 'password', 
      label: 'Senha', 
      type: 'password', 
      placeholder: 'Digite sua senha', 
      validators: [Validators.required, Validators.minLength(8)],
      validationMessages: [
        { type: 'required', message: 'A senha é obrigatória.' },
        { type: 'minlength', message: 'A senha deve ter no mínimo 8 caracteres.' }
      ]
    },
    { 
      name: 'confirmPassword', 
      label: 'Confirmar Senha', 
      type: 'password', 
      placeholder: 'Confirme sua senha', 
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'A confirmação de senha é obrigatória.' }
        // TODO: Adicionar validação para garantir que a senha e a confirmação sejam iguais.
      ]
    },
  ];

  private entrepreneurAndPromoterFields: FormFieldConfig[] = [
    { 
      name: 'businessName', 
      label: 'Nome do seu negócio', 
      type: 'text', 
      placeholder: 'Digite o nome do negócio', 
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'O nome do negócio é obrigatório.' }
      ]
    },
    { 
      name: 'cnpj', 
      label: 'CNPJ', 
      type: 'text', 
      placeholder: 'Digite o CNPJ da empresa', 
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'O CNPJ é obrigatório.' }
        // TODO: Adicionar validação para formato de CNPJ.
      ]
    },
    { 
      name: 'email', 
      label: 'Email', 
      type: 'email', 
      placeholder: 'Digite seu email', 
      validators: [Validators.required, Validators.email],
      validationMessages: [
        { type: 'required', message: 'O email é obrigatório.' },
        { type: 'email', message: 'Por favor, insira um email válido.' }
      ]
    },
    { 
      name: 'password', 
      label: 'Senha', 
      type: 'password', 
      placeholder: 'Digite sua senha', 
      validators: [Validators.required, Validators.minLength(8)],
      validationMessages: [
        { type: 'required', message: 'A senha é obrigatória.' },
        { type: 'minlength', message: 'A senha deve ter no mínimo 8 caracteres.' }
      ]
    },
    { 
      name: 'confirmPassword', 
      label: 'Confirmar Senha', 
      type: 'password', 
      placeholder: 'Confirme sua senha', 
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'A confirmação de senha é obrigatória.' }
      ]
    },
  ];
}
