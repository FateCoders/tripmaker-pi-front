import { Component, inject, signal } from '@angular/core'; // Adicione signal
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms'; // Remova FormBuilder, FormGroup, etc se não usar explicitamente fora do dynamic form
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

  // Controle de estado: Login vs Recuperação
  isRecovering = signal(false);

  // Configuração do Formulário de Login
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

  // Configuração do Formulário de Recuperação (Apenas Email)
  recoveryFormFields: FormFieldConfig[] = [
    {
      name: 'email',
      label: 'Email de Recuperação',
      type: 'email',
      placeholder: 'Digite o email cadastrado',
      validators: [Validators.required, Validators.email],
      validationMessages: [
        { type: 'required', message: 'Email é obrigatório.' },
        { type: 'email', message: 'Insira um email válido.' }
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

  // Lógica de Recuperação de Senha
  handleRecovery(formData: any): void {
    console.log('Solicitando recuperação para:', formData.email);
    
    // Simulação de envio de e-mail
    this.notificationService.open('Link de recuperação enviado para seu e-mail!', 'OK', 'success');
    
    // LOG PARA VOCÊ TESTAR: Mostra o link no console do navegador
    console.warn('LINK SIMULADO (Clique para testar): http://localhost:4200/esqueci-senha/token-teste-123');
    
    // Opcional: Voltar para a tela de login automaticamente após alguns segundos
    setTimeout(() => {
      this.isRecovering.set(false);
    }, 2000);
  }

  toggleMode(): void {
    this.isRecovering.update(val => !val);
  }
}