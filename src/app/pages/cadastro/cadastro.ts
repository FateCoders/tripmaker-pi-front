import { Component, inject } from '@angular/core';
import { DynamicFormComponent, FormFieldConfig } from '../../components/dynamic-form/dynamic-form';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PreferencesComponent } from '../users/traveler/preferences/preferences';

@Component({
  selector: 'app-cadastro',
  imports: [DynamicFormComponent, MatDialogModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  private route = inject(ActivatedRoute);
  public dialog = inject(MatDialog);

  selectedUserType: 'traveler' | 'entrepreneur' | 'promoter' = 'traveler';
  profileTitle = 'Viajante';
  currentFormFields: FormFieldConfig[] = [];
  submitButtonText = 'Finalizar Cadastro';
  private travelerFormData: any = null;

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
        this.submitButtonText = 'Finalizar Cadastro'; // Texto para outros perfis
        break;
      case 'promoter':
        this.profileTitle = 'Promotor Turístico';
        this.currentFormFields = this.entrepreneurAndPromoterFields;
        this.submitButtonText = 'Finalizar Cadastro'; // Texto para outros perfis
        break;
      case 'traveler':
      default:
        this.profileTitle = 'Viajante';
        this.currentFormFields = this.travelerFields;
        this.submitButtonText = 'Próxima Etapa'; // Texto específico para viajante
        break;
    }
  }

  handleRegister(formData: any): void {
    if (this.selectedUserType === 'traveler') {
      // Se for viajante, apenas guarda os dados e abre o modal
      this.travelerFormData = formData;
      this.openPreferencesModal();
    } else {
      // Para outros perfis, finaliza o cadastro diretamente
      this.finalizeRegistration(formData);
    }
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

  openPreferencesModal(): void {
    const dialogRef = this.dialog.open(PreferencesComponent, {
      width: '98vw',
      height: '98vh',
      maxWidth: '98vw',
      autoFocus: false,
      panelClass: 'fullscreen-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('O modal de preferências foi fechado');

      if (result) {
        console.log('Preferências recebidas:', result);
        // A lógica de finalização do cadastro do viajante virá aqui (ver passo 3)
      }
    });
  }

  private finalizeRegistration(finalData: any): void {
    console.log(`FINALIZANDO CADASTRO PARA ${this.selectedUserType}:`, finalData);
  }
}
