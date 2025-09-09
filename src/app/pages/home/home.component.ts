import { Component } from '@angular/core';
import { FooterUsercomumComponent } from "../../components/public/footer-usercomum/footer-usercomum.component";
import { ChipButtonComponent } from "../../components/buttons/chip-button/chip-button";

@Component({
  selector: 'app-home',
  imports: [FooterUsercomumComponent, ChipButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
