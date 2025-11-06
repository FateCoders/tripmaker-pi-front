import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chip-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule],
  template: `
    <mat-chip-option
      [selected]="value()"
      [disabled]="isDisabled"
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
  styles: [
    `
      mat-chip-option {
        --mdc-chip-elevated-container-color: #eef2ff;
        --mdc-chip-label-text-color: #4338ca;
      }
      mat-chip-option.mat-mdc-chip-selected {
        --mdc-chip-elevated-container-color: #4f46e5;
        --mdc-chip-label-text-color: #ffffff;
      }
      mat-chip-option[disabled] {
        --mdc-chip-elevated-container-color: #f3f4f6;
        --mdc-chip-label-text-color: #9ca3af;
        cursor: not-allowed;
      }
    `,
  ],
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
  @Input() isDisabled: boolean = false; // ✅ agora é Input

  value = signal<boolean>(false);

  private onChange: (value: boolean) => void = () => { };
  private onTouched: () => void = () => { };

  toggleSelection(): void {
    if (this.isDisabled) return; // ✅ respeita o estado desabilitado
    const newValue = !this.value();
    this.value.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.value.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled; // ✅ sincroniza com o Angular Forms
  }
}
