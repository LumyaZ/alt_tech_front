import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/auth/data-access/auth.service";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, PasswordModule],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public email = "";
  public password = "";
  public errorMessage = "";

  // Envoie les identifiants à AuthService, redirige vers l'accueil si ça réussit
  public onSubmit(): void {
    this.errorMessage = "";
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigateByUrl("/home"),
      error: () => this.errorMessage = "Email ou mot de passe incorrect",
    });
  }
}