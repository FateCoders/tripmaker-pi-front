import { Component, inject } from '@angular/core';
import { CommerceService } from '../../../../services/commerce.service';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { Commerce } from '../../../../interfaces/commerce';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FooterUsercomumComponent } from "../../../../components/public/bottom-menu/bottom-menu.component";

@Component({
  selector: 'app-administrator-commerce',
  imports: [HeaderTitle, MatIconModule, MatButtonModule, CommonModule, FooterUsercomumComponent],
  templateUrl: './commerce.html',
  styleUrl: './commerce.scss',
})
export class AdministratorCommerce {
  
}
