import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Phone } from '../../../models';
import { AuthService, PhoneService } from '../../../core/services';
import { AsyncPipe } from '@angular/common';
import { ButtonDetails, NoPhoneMessage } from '../../../shared';

@Component({
  selector: 'app-my-phones-card',
  imports: [AsyncPipe, ButtonDetails, NoPhoneMessage],
  templateUrl: './my-phones-card.html',
  styleUrl: './my-phones-card.css',
})
export class MyPhonesCard {
  phones$: Observable<Phone[]>;
  private phoneService = inject(PhoneService);
  private authService = inject(AuthService);
  private userId: string | null = this.authService.getCurrentUserId();

  constructor() {
    this.phones$ = this.phoneService.getMyPhones(this.userId);
  }
}
