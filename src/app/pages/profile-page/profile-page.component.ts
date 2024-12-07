import { Component, inject, OnInit, signal } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthenticationService } from '../../services/authentication.service';
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-page',
  imports: [MatDividerModule, MatCardModule, MatButtonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  protected readonly channelToken = signal<string | null>(null);
  private readonly backend = inject(BackendService);
  private readonly router = inject(Router);
  private readonly snackbar = inject(MatSnackBar);
  private readonly authenticationService = inject(AuthenticationService);

  protected readonly loading = signal(false);

  public ngOnInit(): void {
    this.backend.authentication.getToken().subscribe({
      next: response => {
        this.channelToken.set(response.channelToken)
      },
      error: error => {
        console.error(error);
        this.router.navigate(["/"])
      }
    })
  }

  protected async copyToken() {
    const token = this.channelToken();
    if (token === null) return;
    await navigator.clipboard.writeText(token);
    this.snackbar.open("Copied to clipboard.", undefined, { duration: 2000 });
  }

  protected renew() {
    this.loading.set(true);
    this.backend.authentication.renew().subscribe({
      next: response => {
        this.channelToken.set(response.channelToken);
        this.snackbar.open("Renewed token.", undefined, { duration: 2000 });
        this.loading.set(false);
      },
      error: error => {
        console.error(error);
        this.snackbar.open("Error while creating new token.", undefined, { duration: 2000 });
        this.loading.set(false);
      }
    })
  }

  protected remove() {
    this.loading.set(true);
    this.backend.authentication.remove().subscribe({
      next: response => {
        this.channelToken.set("");
        this.authenticationService.removeToken();
        this.router.navigate(["/"])
      },
      error: error => {
        console.error(error);
        this.snackbar.open("Error while creating new token.", undefined, { duration: 2000 });
        this.loading.set(false);
      }
    })
  }
}
