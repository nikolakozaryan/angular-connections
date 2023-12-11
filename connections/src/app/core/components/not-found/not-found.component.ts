import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import ROUTES from '@core/models/enums/routes.enum';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  public routes = ROUTES;
}
