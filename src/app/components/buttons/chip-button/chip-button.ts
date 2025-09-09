import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef, signal, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-chip-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule],
  template: `
    <mat-chip-option
      [selected]="value()"
      [disabled]="isDisabled()"
      (click)="toggleSelection()"
      color="primary"
      class="transition-all duration-200 ease-in-out"
    >
      <span class="flex items-center gap-2">
        @if (icon) {
          <mat-icon [fontIcon]="icon"></mat-icon>
        }
        {{ label }}
      </span>
    </mat-chip-option>
  `,
  styles: [`
    /* Estilos específicos para o componente de chip */
    mat-chip-option {
      --mdc-chip-elevated-container-color: #eef2ff; /* bg-indigo-50 */
      --mdc-chip-label-text-color: #4338ca; /* text-indigo-700 */
    }
    mat-chip-option.mat-mdc-chip-selected {
      --mdc-chip-elevated-container-color: #4f46e5; /* bg-indigo-600 */
      --mdc-chip-label-text-color: #ffffff; /* text-white */
    }
    mat-chip-option[disabled] {
        --mdc-chip-elevated-container-color: #f3f4f6; /* bg-gray-100 */
        --mdc-chip-label-text-color: #9ca3af; /* text-gray-400 */
        cursor: not-allowed;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipButtonComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipButtonComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() icon: string = '';

  value = signal<boolean>(false);
  isDisabled = signal<boolean>(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggleSelection(): void {
    if (this.isDisabled()) return;
    const newValue = !this.value();
    this.value.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value.set(!!value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
    MatButtonModule,
    MatCardModule,
    ChipButtonComponent,
  ],
  template: `
    <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
      <mat-card class="w-full max-w-md">
        <mat-card-header class="justify-center">
            <mat-card-title class="!text-2xl !font-bold text-gray-800 mb-2">Formulário com Chip</mat-card-title>
            <mat-card-subtitle>Demonstração do ControlValueAccessor</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="p-6 text-center" [formGroup]="preferencesForm">
            <p class="text-gray-600 mb-6">Selecione as suas preferências:</p>
            
            <div class="flex flex-wrap justify-center gap-4">
               <app-chip-button label="Notificações" icon="notifications" formControlName="notifications"></app-chip-button>
               <app-chip-button label="Modo Escuro" icon="dark_mode" formControlName="darkMode"></app-chip-button>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-lg font-semibold text-gray-700">Valor Atual do Formulário</h3>
                <pre class="mt-2 p-3 bg-gray-50 rounded-lg text-left font-mono text-sm text-indigo-800">{{ preferencesForm.value | json }}</pre>
            </div>
        </mat-card-content>
        <mat-card-actions class="p-4 flex justify-center">
            <button mat-flat-button color="primary" (click)="toggleDarkModeControl()">
                Ativar/Desativar Chip "Modo Escuro"
            </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `:host { display: block; height: 100%; }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  preferencesForm: FormGroup;

  constructor() {
    this.preferencesForm = new FormGroup({
      notifications: new FormControl(true),
      darkMode: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.preferencesForm.get('darkMode')?.valueChanges.subscribe(value => {
      console.log('Modo escuro alterado para:', value);
    });
  }

  toggleDarkModeControl(): void {
    const darkModeControl = this.preferencesForm.get('darkMode');
    if (darkModeControl) {
      darkModeControl.disabled ? darkModeControl.enable() : darkModeControl.disable();
    }
  }
}

