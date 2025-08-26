import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-toggle-input',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './toggle-input.html',
  styleUrls: ['./toggle-input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleInput),
      multi: true
    }
  ]
})
export class ToggleInput implements ControlValueAccessor {
  value: boolean = false;
  disabled = false;

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onToggleChange(event: any) {
    this.value = event.checked;
    this.onChange(this.value);
    this.onTouched();
  }
}
