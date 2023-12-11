import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import ROUTES from '@core/models/enums/routes.enum';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthorized.pipe(
    map((isAuthorized) => {
      if (isAuthorized) {
        router.navigate([`/${ROUTES.Profile}`]);
        return false;
      } else {
        return true;
      }
    })
  );
};
