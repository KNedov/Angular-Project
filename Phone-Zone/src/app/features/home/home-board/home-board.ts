import { Component, inject, Signal, signal } from '@angular/core';
import { Comment, Phone } from '../../../models';
import { catchError, finalize, Observable, of, Subscription } from 'rxjs';
import { AuthService, PhoneService } from '../../../core/services';
import { Loader, NoPhoneMessage } from '../../../shared';
import { PhoneCard } from '../phone-card/phone-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-board',
  imports: [NoPhoneMessage, PhoneCard, CommonModule],
  templateUrl: './home-board.html',
  styleUrl: './home-board.css',
})
export class HomeBoard {
  phones$: Observable<Phone[]>;
  private authService = inject(AuthService);
  private phoneService = inject(PhoneService);
  readonly isLoggedIn$: Signal<boolean> = this.authService.isLoggedIn$;

  constructor() {
    this.phones$ = this.phoneService.getPhones(3);
  }
}
