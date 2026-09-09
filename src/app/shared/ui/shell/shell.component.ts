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
  public readonly cartItemCount = this.cartService.itemCount;
  public readonly userEmail = this.authService.email;

  ngOnInit() {
    this.cartService.get().subscribe();
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
