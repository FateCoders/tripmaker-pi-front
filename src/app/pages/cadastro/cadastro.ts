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
    { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite seu nome', validators: [Validators.required] },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu email', validators: [Validators.required, Validators.email]},
    { name: 'phone', label: 'Telefone', type: 'tel', placeholder: 'Digite seu telefone', validators: [Validators.required] },
    { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha', validators: [Validators.required, Validators.minLength(8)] },
    { name: 'confirmPassword', label: 'Confirmar Senha', type: 'password', placeholder: 'Confirme sua senha', validators: [Validators.required] },
  ];

  private entrepreneurAndPromoterFields: FormFieldConfig[] = [
    { name: 'businessName', label: 'Nome do seu negócio', type: 'text', placeholder: 'Digite o nome do negócio', validators: [Validators.required] },
    { name: 'cnpj', label: 'CNPJ', type: 'text', placeholder: 'Digite o CNPJ da empresa', validators: [Validators.required] },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu email', validators: [Validators.required, Validators.email] },
    { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha', validators: [Validators.required, Validators.minLength(8)] },
    { name: 'confirmPassword', label: 'Confirmar Senha', type: 'password', placeholder: 'Confirme sua senha', validators: [Validators.required] },
  ];
}