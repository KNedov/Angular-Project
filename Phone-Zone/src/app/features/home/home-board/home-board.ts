import { Component, inject, Signal } from '@angular/core';
import { Phone } from '../../../models';
import {  Observable } from 'rxjs';
import { AuthService, PhoneService } from '../../../core/services';
import { NoPhoneMessage } from '../../../shared';
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
