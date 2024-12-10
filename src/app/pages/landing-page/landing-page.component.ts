import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [MatButtonModule, MatCardModule, MatTabsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);

  protected readonly commands = signal([
    {
      name: '!map',
      cooldown: 10,
      accessLevel: 'USER',
      description: "Shows the current Trackmania map being played.",
    },
    {
      name: '!format',
      cooldown: 10,
      accessLevel: 'USER',
      description: "Displays the correct format for submitting a time guess.",
    },
    {
      name: '!guess',
      aliases: ['g'],
      cooldown: 0,
      accessLevel: 'USER',
      description: "Submit your guess for the best time on the current map.",
    },
    {
      name: '!wgpt-time-delay',
      cooldown: 0,
      accessLevel: 'MOD',
      description: "Set a delay (in seconds) before revealing the best time to avoid spoilers in chat.",
    },
    {
      name: '!result',
      cooldown: 0,
      accessLevel: 'MOD',
      description: "Manually end the guessing game with the final time: `!result <time>`.",
    },
    {
      name: '!myguess',
      aliases: ['mg'],
      cooldown: 2,
      accessLevel: 'USER',
      description: "Check your current submitted guess for the best time.",
    },
    {
      name: '!resetTimes',
      cooldown: 0,
      accessLevel: 'MOD',
      description: "Clear all submitted guesses for the current round.",
    },
  ]);

  protected login() {

    if (this.authenticationService.isTokenExpired()) {
      this.authenticationService.removeToken();
      window.location.href = `${environment.backend}/authentication/twitch`;
      return;
    }
    this.router.navigate(["/profile"])

  }

  protected loginText() {
    return this.authenticationService.isTokenExpired() ? "Login via Twitch" : "Go to your Profile"
  }

}
