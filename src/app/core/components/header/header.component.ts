import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { selectIsAuthorized } from "@auth/store/auth.selectors";
import { Store } from "@ngrx/store";

import { ButtonComponent } from "../button/button.component";
import { LogoComponent } from "./components/logo/logo.component";
import { ThemeTogglerComponent } from "./components/theme-toggler/theme-toggler.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    ThemeTogglerComponent,
    LogoComponent,
    ButtonComponent,
  ],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isAuthorized$ = this.store.select(selectIsAuthorized);

  constructor(private store: Store) {}
}
