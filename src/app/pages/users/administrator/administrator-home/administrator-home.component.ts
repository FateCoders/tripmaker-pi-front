import { Component } from '@angular/core';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { HeaderTitle } from "../../../../components/header-title/header-title";

@Component({
  selector: 'app-administrator-home',
  imports: [FooterUsercomumComponent, HeaderTitle],
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.scss'],
})
export class AdministratorHome {}
