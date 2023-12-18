import { Routes } from "@angular/router";
import { guestGuard } from "@core/guards/guest.guard";
import ROUTES from "@core/models/enums/routes.enum";

import { LoginFormComponent } from "./components/login-form/login-form.component";
import { SignupFormComponent } from "./components/signup-form/signup-form.component";

const AUTH_ROUTES: Routes = [
  {
    path: ROUTES.Signin,
    canActivate: [guestGuard],
    component: LoginFormComponent,
  },
  {
    path: ROUTES.Signup,
    canActivate: [guestGuard],
    component: SignupFormComponent,
  },
];

export default AUTH_ROUTES;
