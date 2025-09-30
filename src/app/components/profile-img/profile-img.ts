import { Component, Input } from '@angular/core';
import { IFigure } from '../../interfaces/figure';

@Component({
  selector: 'app-profile-img',
  imports: [],
  templateUrl: './profile-img.html',
  styleUrl: './profile-img.scss'
})
export class ProfileImg {
@Input() imagem!: IFigure 
}
