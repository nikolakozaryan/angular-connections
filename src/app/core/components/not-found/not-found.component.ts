import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import ROUTES from "@core/models/enums/routes.enum";

import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  public routes = ROUTES;
}
