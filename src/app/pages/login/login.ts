import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormComponent, FormFieldConfig } from "../../components/dynamic-form/dynamic-form";
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, DynamicFormComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  loginFormFields: FormFieldConfig[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Digite seu email',
      validators: [Validators.required, Validators.email],
      validationMessages: [
        { type: 'required', message: 'Email é obrigatório.' },
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
        { type: 'required', message: 'Senha é obrigatória.' },
        { type: 'minlength', message: 'A senha deve ter no mínimo 8 caracteres.' }
      ]
    }
  ];

  handleLogin(formData: any): void {
    if (formData) {
      const user = this.authService.login(formData);

      if (user) {
        this.notificationService.open(`Bem-vindo de volta, ${user.name}!`, 'OK', 'success');
        this.router.navigate([`/${user.role}/inicio`]);
      } else {
        this.notificationService.open('Email ou senha inválidos. Tente novamente.', 'Fechar', 'error');
      }
    }
  }
}