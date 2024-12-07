import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  protected login() {
    window.location.href = `${environment.backend}/authentication/twitch`
  }

}
