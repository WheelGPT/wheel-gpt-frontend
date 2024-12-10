import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthenticationAuthGuard } from './authentication.guard';
import { RedirectPageComponent } from './pages/redirect-page/redirect-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';

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
    path: "privacy",
    component: PrivacyPolicyPageComponent,
    title: "WheelGPT: Privacy Policy",
  },
  {
    path: "**",
    redirectTo: "/twitch-authentication",
    pathMatch: "full",
  },
];
