import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PanelMenuComponent } from "app/shared/ui/panel-menu/panel-menu.component";
import { SplitterModule } from "primeng/splitter";
import { ToolbarModule } from "primeng/toolbar";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [RouterOutlet, PanelMenuComponent, ToolbarModule, SplitterModule],
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
})
export class ShellComponent {
  public readonly title = "ALTEN SHOP";
}
