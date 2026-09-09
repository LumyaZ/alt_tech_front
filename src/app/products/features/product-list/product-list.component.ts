import { CurrencyPipe } from "@angular/common";
import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { CartService } from "app/cart/data-access/cart.service";
import { AuthService } from "app/auth/data-access/auth.service";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { TagModule } from "primeng/tag";
import { RatingModule } from "primeng/rating";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [
    DataViewModule,
    CardModule,
    ButtonModule,
    DialogModule,
    TagModule,
    RatingModule,
    InputNumberModule,
    InputTextModule,
    FormsModule,
    CurrencyPipe,
    ProductFormComponent,
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);

  public readonly products = this.productsService.products;
  public readonly isAdmin = this.authService.isAdmin;

  public readonly searchTerm = signal("");
  public readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.products();
    }
    return this.products().filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  private readonly quantities = new Map<number, number>();

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public quantityFor(product: Product): number {
    return this.quantities.get(product.id) ?? 1;
  }

  public setQuantity(product: Product, quantity: number): void {
    this.quantities.set(product.id, quantity);
  }

  public onAddToCart(product: Product) {
    this.cartService.addItem(product.id, this.quantityFor(product)).subscribe();
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  public getSeverity(status: Product["inventoryStatus"]): "success" | "warning" | "danger" {
    switch (status) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      default:
        return "danger";
    }
  }
}
