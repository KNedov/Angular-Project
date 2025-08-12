import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ActiveLink } from '../../directives';
import { AuthService, ErrorService } from '../../../core/services';
import { ErrorNotification } from '../error-notification/error-notification';
@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule, ActiveLink, ErrorNotification],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(AuthService);
  router = inject(Router);
  public errorService = inject(ErrorService);

  isLoggedIn$ = this.authService.isLoggedIn;

  logout(): void {
    if (this.isLoggedIn$()) {
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
}
