import { Routes } from "@angular/router";
import AUTH_ROUTES from "@auth/auth.routes";
import { NotFoundComponent } from "@core/components/not-found/not-found.component";
import { authGuard } from "@core/guards/auth.guard";
import ROUTES from "@core/models/enums/routes.enum";
import { MainComponent } from "@main/components/main/main.component";

export const routes: Routes = [
  ...AUTH_ROUTES,
  {
    path: ROUTES.Profile,
    canActivate: [authGuard],
    loadChildren: () => import("./profile/profile.routes"),
  },
  {
    path: ROUTES.Root,
    canActivate: [authGuard],
    component: MainComponent,
    pathMatch: "full",
  },
  { path: "**", component: NotFoundComponent },
];
