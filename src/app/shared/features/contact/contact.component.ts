import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";

const MESSAGE_MAX_LENGTH = 300;

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, InputTextareaModule],
})
export class ContactComponent {
  public readonly messageMaxLength = MESSAGE_MAX_LENGTH;

  public email = "";
  public message = "";
  public isSubmitted = false;

  // Pas d'endpoint back pour le contact dans le sujet : on simule l'envoi côté front
  public onSubmit(): void {
    this.isSubmitted = true;
  }
}
