import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormComponent, FormFieldConfig } from "../../components/dynamic-form/dynamic-form";
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, DynamicFormComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  isLoading = false;

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
      validators: [Validators.required, Validators.minLength(6)],
      validationMessages: [
        { type: 'required', message: 'Senha é obrigatória.' }
      ]
    }
  ];

  handleLogin(formData: any): void {
    if (formData) {
      this.isLoading = true;

      this.authService.login(formData).subscribe({
        next: (user) => {
          this.isLoading = false;
          this.notificationService.open(`Bem-vindo de volta, ${user.name}!`, 'OK', 'success');

          if (user.role) {
            this.router.navigate([`/${user.role}/inicio`]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          const msg = error.message || 'Email ou senha inválidos. Tente novamente.';
          this.notificationService.open(msg, 'Fechar', 'error');
        }
      });
    }
  }
}