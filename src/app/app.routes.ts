import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { LoginComponent } from "./products/features/login/login.component";
import { ShellComponent } from "./shared/ui/shell/shell.component";

export const APP_ROUTES: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  // "/" exact uniquement (pathMatch: "full") : ne touche pas à "/home" ou "/products/..."
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "products",
        loadChildren: () =>
          import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
      },
    ],
  },
  { path: "**", redirectTo: "login" },
];
