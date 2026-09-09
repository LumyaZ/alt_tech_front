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

  public readonly itemCount = computed(() =>
    this._cart().items.reduce((total, item) => total + item.quantity, 0)
  );

  public get(): Observable<Cart> {
    return this.http.get<Cart>(this.path).pipe(
      tap((cart) => this._cart.set(cart)),
    );
  }

  public addItem(productId: number, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.path}/items`, { productId, quantity }).pipe(
      tap((cart) => this._cart.set(cart)),
    );
  }

  public removeItem(productId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.path}/items/${productId}`).pipe(
      tap((cart) => this._cart.set(cart)),
    );
  }

  public updateItemQuantity(productId: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.path}/items/${productId}`, { quantity }).pipe(
      tap((cart) => this._cart.set(cart)),
    );
  }
}
