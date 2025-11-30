import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Validators, ValidatorFn } from '@angular/forms';

import { DynamicFormComponent, FormFieldConfig } from '../../components/dynamic-form/dynamic-form';
import { NotificationService } from '../../services/notification-service';
import { matchPasswordsValidator } from '../../validators/match-passwords.validator';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, DynamicFormComponent],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private platformId = inject(PLATFORM_ID);

  // Mock token para validação
  private readonly VALID_TOKEN = 'token-teste-123';

  resetPasswordFields: FormFieldConfig[] = [
    {
      name: 'password',
      label: 'Nova Senha',
      type: 'password',
      placeholder: 'Digite sua nova senha',
      validators: [Validators.required, Validators.minLength(8)],
      validationMessages: [
        { type: 'required', message: 'A senha é obrigatória.' },
        { type: 'minlength', message: 'A senha deve ter no mínimo 8 caracteres.' },
      ],
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Nova Senha',
      type: 'password',
      placeholder: 'Confirme sua nova senha',
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'A confirmação de senha é obrigatória.' },
        { type: 'mustMatch', message: 'As senhas não coincidem.' },
      ],
    },
  ];

  formGroupValidators: ValidatorFn[] = [matchPasswordsValidator];

  ngOnInit(): void {
    // Only validate token on browser to avoid SSR issues
    if (isPlatformBrowser(this.platformId)) {
      const token = this.route.snapshot.paramMap.get('token');

      if (!token || token !== this.VALID_TOKEN) {
        this.notificationService.open(
          'Token inválido ou expirado. Solicite um novo link de recuperação.',
          'Fechar',
          'error'
        );
        this.router.navigate(['/']);
      }
    }
  }

  handleResetPassword(formData: any): void {
    if (formData) {
      // Simula a redefinição de senha (mock)
      this.notificationService.open(
        'Senha redefinida com sucesso! Faça login com sua nova senha.',
        'OK',
        'success'
      );
      this.router.navigate(['/']);
    }
  }
}
