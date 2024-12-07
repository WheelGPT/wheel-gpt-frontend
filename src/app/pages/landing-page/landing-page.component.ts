import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-landing-page',
  imports: [MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  private readonly authenticationService = inject(AuthenticationService);

  protected login() {
    this.authenticationService.removeToken();
    window.location.href = `${environment.backend}/authentication/twitch`
  }

}
