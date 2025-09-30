import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RoutesService } from '../../../../services/routes.service';
import { FooterUsercomumComponent } from "../../../../components/public/bottom-menu/bottom-menu.component";
import { HeaderTitle } from "../../../../components/header-title/header-title";

@Component({
  selector: 'app-entrepreneur-home',
  standalone: true,
  imports: [CommonModule, MatListModule, MatSlideToggleModule, FooterUsercomumComponent, HeaderTitle],
  templateUrl: './entrepreneur-home.html',
  styleUrl: './entrepreneur-home.scss'
})
export class EntrepreneurHome implements OnInit {
  private routesService = inject(RoutesService);
  routes: any[] = [];

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes(): void {
    this.routes = this.routesService.getAllRoutes();
  }

  toggleRoute(routeId: string): void {
    this.routesService.toggleRouteStatus(routeId);
    this.loadRoutes(); 
  }
}