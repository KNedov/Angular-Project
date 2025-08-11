import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Phone } from '../../../models';
import { AuthService, PhoneService } from '../../../core/services';
import { PhoneCard, NoPhoneMessage } from '../../../shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-phones-board',
  imports: [PhoneCard, PhoneCard, NoPhoneMessage, AsyncPipe],
  templateUrl: './my-phones-board.html',
  styleUrl: './my-phones-board.css',
})
export class MyPhonesBoard {
  phones$: Observable<Phone[]>;
  private phoneService = inject(PhoneService);
  private authService = inject(AuthService);
  private userId: string | null = this.authService.getCurrentUserId();

  constructor() {
    this.phones$ = this.phoneService.getMyPhones(this.userId);
  }
}
