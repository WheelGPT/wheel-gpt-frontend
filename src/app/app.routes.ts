import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthenticationAuthGuard } from './authentication.guard';
import { RedirectPageComponent } from './pages/redirect-page/redirect-page.component';

export const routes: Routes = [
  {
    path: "profile",
    component: ProfilePageComponent,
    title: "WheelGPT: Profile",
    canActivate: [AuthenticationAuthGuard],
  },
  {
    path: "twitch-authentication",
    component: RedirectPageComponent,
    title: "WheelGPT: Redirecting ...",
  },
  {
    path: "",
    component: LandingPageComponent,
    title: "WheelGPT: Welcome!",
  },
  {
    path: "**",
    redirectTo: "/twitch-authentication",
    pathMatch: "full",
  },
];
