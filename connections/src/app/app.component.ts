import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/components/header/header.component';
import { ToastComponent } from '@core/components/toast/toast.component';
import Themes from '@core/models/enums/theme.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    HeaderComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const themeFromStorage = localStorage.getItem('theme') as Themes | null;

    if (!themeFromStorage) {
      localStorage.setItem('theme', Themes.LIGHT);
    }
    document.body.classList.add(
      themeFromStorage ? themeFromStorage : Themes.LIGHT
    );
  }
}
