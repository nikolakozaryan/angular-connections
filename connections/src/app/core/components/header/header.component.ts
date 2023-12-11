import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeTogglerComponent } from './components/theme-toggler/theme-toggler.component';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonComponent } from '../button/button.component';
import { Store } from '@ngrx/store';
import { selectIsAuthorized } from '@auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ThemeTogglerComponent,
    LogoComponent,
    ButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isAuthorized$ = this.store.select(selectIsAuthorized);

  constructor(private store: Store) {}
}
