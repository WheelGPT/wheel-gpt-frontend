import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  public ngOnInit(): void {
    if (this.authenticationService.isTokenExpired()) {
      this.authenticationService.removeToken();
      return;
    }
    this.router.navigate(["/profile"]);
  }
}
