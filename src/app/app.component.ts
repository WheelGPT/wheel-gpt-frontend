import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { MatToolbar } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, RouterLink, MatButtonModule, MatIconModule, MatDivider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  public ngOnInit(): void {
    if (this.authenticationService.isTokenExpired()) {
      this.authenticationService.removeToken();
      return;
    }
  }

  protected logout() {
    this.authenticationService.removeToken();
    this.router.navigate(["/"]);
  }
}
