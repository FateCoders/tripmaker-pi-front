import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

export interface ValidationMessage {
  type: string;
  message: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder: string;
  initialValue?: any;
  validators?: ValidatorFn[];
  validationMessages?: ValidationMessage[];
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss']
})
export class DynamicFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() fields: FormFieldConfig[] = [];
  @Input() formTitle: string = 'Formulário';
  @Input() submitButtonText: string = 'Enviar';
  
  @Input() formValidators: ValidatorFn[] = [];

  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const controlsConfig: { [key: string]: any } = {};
    this.fields.forEach(field => {
      controlsConfig[field.name] = [
        field.initialValue || '',
        field.validators || []
      ];
    });
    
    this.form = this.fb.group(controlsConfig, { validators: this.formValidators });
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
