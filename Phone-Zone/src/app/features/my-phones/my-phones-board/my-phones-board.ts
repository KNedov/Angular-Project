import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Phone } from '../../../models';
import { AuthService, PhoneService } from '../../../core/services';
import { PhoneCard, NoPhoneMessage } from '../../../shared';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-phones-board',
  imports: [PhoneCard, PhoneCard, NoPhoneMessage, AsyncPipe],
  templateUrl: './my-phones-board.html',
  styleUrl: './my-phones-board.css',
})
export class MyPhonesBoard implements OnInit {
  private destroyRef = inject(DestroyRef);
  private phoneService = inject(PhoneService);
  private authService = inject(AuthService);
  private userId: string | null = this.authService.getCurrentUserId();
  phones$: Observable<Phone[]> = this.phoneService.phones$;

ngOnInit() {
  this.phoneService
    .getMyPhones(this.userId)
}

}
