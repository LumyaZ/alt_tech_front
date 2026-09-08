import { Component, OnInit, inject } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "app/auth/data-access/auth.service";
import { CartService } from "app/cart/data-access/cart.service";
import { PanelMenuComponent } from "app/shared/ui/panel-menu/panel-menu.component";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { SplitterModule } from "primeng/splitter";
import { ToolbarModule } from "primeng/toolbar";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [RouterOutlet, RouterLink, PanelMenuComponent, ToolbarModule, SplitterModule, ButtonModule, BadgeModule],
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
})
export class ShellComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  public readonly title = "ALTEN SHOP";
  // Nombre total d'articles dans le panier, pour le badge sur l'icône
  public readonly cartItemCount = this.cartService.itemCount;

  ngOnInit() {
    // Charge le panier dès l'arrivée sur le shell, pour que le badge soit à jour
    // sur n'importe quelle page, pas seulement la page Panier elle-même
    this.cartService.get().subscribe();
  }

  // Efface le token et renvoie vers la page de connexion
  public onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
