import { Component, inject, input, Signal } from '@angular/core';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-no-phone-message',
  imports: [],
  templateUrl: './no-phone-message.html',
  styleUrl: './no-phone-message.css',
})
export class NoPhoneMessage {
  authService = inject(AuthService);
  readonly isLoggedIn$: Signal<boolean> = this.authService.isLoggedIn;
}
