import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ActiveLink } from '../../directives/active-link/active-link';
import { AuthService } from '../../../core/services';
import { ErrorNotification } from '../error-notification/error-notification';
@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule, ActiveLink,ErrorNotification],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;
  currentUser = this.authService.currentUser;

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('Logout failed', err);
      },
    });
  }
}
