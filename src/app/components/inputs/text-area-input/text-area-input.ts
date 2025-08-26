import { Component, Input } from '@angular/core';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-text-area-input',
  imports: [MatInputModule],
  templateUrl: './text-area-input.html',
  styleUrl: './text-area-input.scss'
})
export class TextAreaInput {
  @Input() label:string = ''
  @Input() placeholder:string = ''
  @Input() value:string = ''
}
