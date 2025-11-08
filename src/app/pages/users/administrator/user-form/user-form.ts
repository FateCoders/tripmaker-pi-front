import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { DynamicFormComponent, FormFieldConfig } from '../../../../components/dynamic-form/dynamic-form';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { UserRole, User } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user.service';
import { cnpjValidator } from '../../../../validators/cnpj.validator';
import { matchPasswordsValidator } from '../../../../validators/match-passwords.validator';
import { phoneValidator } from '../../../../validators/phone.validator';


@Component({
  selector: 'app-administrator-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderTitle,
    DynamicFormComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class AdministratorUserForm implements OnInit {

  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Injetar ActivatedRoute
  private userService = inject(UserService);

  // Sinal para armazenar os campos do formulário dinâmico
  dynamicFormFields = signal<FormFieldConfig[]>([]);
  // Validador de grupo para o dynamic-form
  dynamicFormValidators: ValidatorFn[] = [matchPasswordsValidator];
  
  private userRole: UserRole = 'viajante'; // Padrão
  pageTitle = signal('Novo Usuário');

  ngOnInit(): void {
    // Captura o 'role' da URL
    this.route.paramMap.pipe(
      map(params => params.get('role') as UserRole | null)
    ).subscribe(role => {
      if (role) {
        this.userRole = role;
        this.setFormFieldsBasedOnRole(role);
      } else {
        // Fallback, caso a rota seja acessada sem parâmetro
        console.warn('Nenhum "role" fornecido, voltando para a lista.');
        this.goBack();
      }
    });
  }

  /**
   * Define os campos do formulário dinâmico com base no 'role'
   */
  private setFormFieldsBasedOnRole(role: UserRole): void {
    switch (role) {
      case 'viajante':
        this.pageTitle.set('Novo Viajante');
        this.dynamicFormFields.set(this.travelerFields);
        break;
      case 'empreendedor':
        this.pageTitle.set('Novo Empreendedor');
        this.dynamicFormFields.set(this.businessFields);
        break;
      case 'promotor':
        this.pageTitle.set('Novo Promotor');
        this.dynamicFormFields.set(this.businessFields); // Usa os mesmos campos de Empreendedor
        break;
      case 'administrador':
        this.pageTitle.set('Novo Administrador');
        this.dynamicFormFields.set(this.travelerFields); // Usa os mesmos campos de Viajante
        break;
    }
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * Chamado quando o dynamic-form é submetido.
   * @param formData Os dados dos campos do dynamic-form
   */
  handleRegister(formData: any): void {
    // Remove o campo de confirmação de senha
    delete formData.confirmPassword;

    // Renomeia campos de negócios se necessário (para bater com a interface User)
    // O formulário de 'business' envia 'businessName', mas a interface User espera 'name'.
    if (formData.businessName) {
      formData.name = formData.businessName;
      delete formData.businessName;
    }

    const newUser: Omit<User, 'id'> = {
      ...formData,
      role: this.userRole // Adiciona o role vindo da URL
    };

    this.userService.addUser(newUser).subscribe(
      () => {
        this.router.navigate(['/administrador/usuarios']);
      },
      (error) => {
        console.error('Erro ao criar usuário:', error);
      }
    );
  }

  // --- Definições de Campos (Reutilizadas do cadastro.ts) ---

  private travelerFields: FormFieldConfig[] = [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      placeholder: 'Digite o nome',
      validators: [Validators.required],
      validationMessages: [{ type: 'required', message: 'O nome é obrigatório.' }],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Digite o email',
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
      placeholder: 'Digite a senha',
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
      placeholder: 'Confirme a senha',
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'A confirmação de senha é obrigatória.' },
        { type: 'mustMatch', message: 'As senhas não coincidem.' },
      ],
    },
  ];

  private businessFields: FormFieldConfig[] = [
    {
      name: 'businessName', // Note: 'businessName' será renomeado para 'name' no handleRegister
      label: 'Nome do Negócio/Promotor',
      type: 'text',
      placeholder: 'Digite o nome do negócio',
      validators: [Validators.required],
      validationMessages: [{ type: 'required', message: 'O nome é obrigatório.' }],
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
      placeholder: 'Digite o email',
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
      placeholder: 'Digite a senha',
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
      placeholder: 'Confirme a senha',
      validators: [Validators.required],
      validationMessages: [
        { type: 'required', message: 'A confirmação de senha é obrigatória.' },
        { type: 'mustMatch', message: 'As senhas não coincidem.' },
      ],
    },
  ];
}