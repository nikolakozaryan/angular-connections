import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type ButtonTheme = 'primary' | 'error';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() theme: ButtonTheme = 'primary';
  @Input({ transform: booleanAttribute }) outline = false;
  @Input({ transform: booleanAttribute }) large = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() link: string | null = null;
}
