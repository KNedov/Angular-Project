import { Component, inject, Signal } from '@angular/core';
import { Phone } from '../../../models';
import { Subscription } from 'rxjs';
import { AuthService, PhoneService } from '../../../core/services';
import { Loader, NoPhoneMessage } from '../../../shared';
import { PhoneCard } from '../phone-card/phone-card';

@Component({
  selector: 'app-home-board',
  imports: [NoPhoneMessage, Loader, PhoneCard],
  templateUrl: './home-board.html',
  styleUrl: './home-board.css',
})
export class HomeBoard {
  phones: Phone[] = [];
  test: Phone[] = [];
  isLoading:boolean=true
 authService=inject(AuthService)
  private phonesSubscription!: Subscription;
  readonly isLoggedIn:Signal<boolean>=this.authService.isLoggedIn

  constructor(private phoneService: PhoneService ) {}

  ngOnInit() {
    this.isLoading;
    this.loadingPhones(3);
    this.test
  }

  loadingPhones(limit: number) {
    this.isLoading = true;
    this.phonesSubscription = this.phoneService.getPhones(limit).subscribe({
      next: (phones) => {
        this.phones = phones;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Loading Error:', err);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy() {
    if (this.phonesSubscription) {
      this.phonesSubscription.unsubscribe();
    }
  }
}
