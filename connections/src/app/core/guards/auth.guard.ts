import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@auth/services/auth.service";
import ROUTES from "@core/models/enums/routes.enum";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuth || router.createUrlTree([ROUTES.Signin]);
};
