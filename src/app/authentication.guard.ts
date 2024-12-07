import { Injectable, inject } from "@angular/core";
import {
  type ActivatedRouteSnapshot,
  type CanActivateFn,
  Router,
  type RouterStateSnapshot,
} from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";

@Injectable({
  providedIn: "root",
})
class AuthenticationPermissionsService {
  private readonly router = inject(Router);
  private readonly authentication = inject(AuthenticationService);

  constructor() { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authentication.isTokenExpired()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}

export const AuthenticationAuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(AuthenticationPermissionsService).canActivate(next, state);
};
