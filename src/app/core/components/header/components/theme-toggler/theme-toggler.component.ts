import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import Themes from "@core/models/enums/theme.enum";

@Component({
  selector: "app-theme-toggler",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./theme-toggler.component.html",
  styleUrls: ["./theme-toggler.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTogglerComponent {
  theme: Themes = this.initControlValue();

  handleChange() {
    this.theme = this.theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    localStorage.setItem("theme", this.theme);
  }

  private initControlValue() {
    const themeFromStorage = localStorage.getItem("theme") as Themes | null;

    return themeFromStorage || Themes.LIGHT;
  }
}
