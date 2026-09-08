import { Injectable, inject, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "environments/environment";
import { Cart } from "./cart.model";

const emptyCart: Cart = { id: 0, items: [] };

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly path = `${environment.apiUrl}/cart`;

  private readonly _cart = signal<Cart>(emptyCart);

  public readonly cart = this._cart.asReadonly();

  // Nombre total d'articles (somme des quantités) : utilisé pour le badge
  public readonly itemCount = computed(() =>
    this._cart().items.reduce((total, item) => total + item.quantity, 0)
  );

  // Récupère le panier de l'utilisateur connecté
  public get(): Observable<Cart> {
    return this.http.get<Cart>(this.path).pipe(
      tap((cart) => this._cart.set(cart)),
    );
  }

  // Ajoute un produit (le backend incrémente la quantité s'il y est déjà)
  public addItem(productId: number, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.path}/items`, { productId, quantity }).pipe(
      tap((cart) => this._cart.set(cart)),
    );
  }

  // Retire un produit du panier
  public removeItem(productId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.path}/items/${productId}`).pipe(
      tap((cart) => this._cart.set(cart)),
    );
  }

  // Fixe une quantité exacte pour un produit du panier (0 = le retire)
  public updateItemQuantity(productId: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.path}/items/${productId}`, { quantity }).pipe(
      tap((cart) => this._cart.set(cart)),
    );
  }
}
