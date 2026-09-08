import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from "app/auth/data-access/auth.service";
import { PanelMenuComponent } from "app/shared/ui/panel-menu/panel-menu.component";
import { ButtonModule } from "primeng/button";
import { SplitterModule } from "primeng/splitter";
import { ToolbarModule } from "primeng/toolbar";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [RouterOutlet, PanelMenuComponent, ToolbarModule, SplitterModule, ButtonModule],
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
})
export class ShellComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public readonly title = "ALTEN SHOP";

  // Efface le token et renvoie vers la page de connexion
  public onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
