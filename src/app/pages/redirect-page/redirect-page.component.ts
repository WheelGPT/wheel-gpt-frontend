import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-redirect-page',
  imports: [LoadingComponent],
  templateUrl: './redirect-page.component.html',
  styleUrl: './redirect-page.component.css'
})
export class RedirectPageComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly backend = inject(BackendService);
  private readonly authentication = inject(AuthenticationService);

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const code = params["code"];
      if (code === null) {
        this.redirectToLandingPage();
        return;
      }
      this.backend.authentication.login(code).subscribe({
        next: response => {
          this.authentication.setToken(response.webToken);
          this.authentication.setDisplayName(response.displayName);
          this.authentication.setProfileImage(response.profileImage);
          this.router.navigate(["/profile"])
        },
        error: error => {
          console.log(error);
          this.redirectToLandingPage();
        }
      });
    });
  }

  protected redirectToLandingPage() {
    this.router.navigate(["/"]);
  }

}
