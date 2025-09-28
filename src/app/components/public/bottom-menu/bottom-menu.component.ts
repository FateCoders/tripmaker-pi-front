import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { RoutesService } from "../../../services/routes.service";

@Component({
  selector: 'app-bottom-menu',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './bottom-menu.component.html',
  styleUrl: './bottom-menu.component.scss'
})
export class FooterUsercomumComponent {
  private routesService = inject(RoutesService);
  footerLinks = this.routesService.getUserRoutes();
}
