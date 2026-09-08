import { Injectable, inject, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "environments/environment";

interface TokenResponse {
  token: string;
}

const TOKEN_STORAGE_KEY = "auth_token";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly path = `${environment.apiUrl}/token`;

  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));

  public readonly token = this._token.asReadonly();
  public readonly isAuthenticated = computed(() => this._token() !== null);

  // Envoie email/mot de passe à /token, stocke le JWT reçu si la connexion réussit
  public login(email: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.path, { email, password }).pipe(
      tap((response) => this.setToken(response.token)),
    );
  }

  // Efface le token courant : déconnecte l'utilisateur
  public logout(): void {
    this.setToken(null);
  }

  // Met à jour le signal ET le localStorage en même temps, pour rester synchronisés
  private setToken(token: string | null): void {
    this._token.set(token);
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }
}