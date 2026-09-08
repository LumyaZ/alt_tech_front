import { CurrencyPipe } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { CartService } from "app/cart/data-access/cart.service";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";

@Component({
  selector: "app-cart-page",
  standalone: true,
  imports: [CardModule, ButtonModule, CurrencyPipe],
  templateUrl: "./cart-page.component.html",
})
export class CartPageComponent implements OnInit {
  private readonly cartService = inject(CartService);

  public readonly cart = this.cartService.cart;

  ngOnInit() {
    this.cartService.get().subscribe();
  }

  // Retire le produit du panier (par son id, pas celui de la ligne de panier)
  public onRemove(productId: number) {
    this.cartService.removeItem(productId).subscribe();
  }
}
