import { ChangeDetectorRef, Component } from '@angular/core';
import { PhoneService } from '../../core/services';
import { Phone } from '../../models';

import { PhoneCard } from '../../shared/components/phone-card/phone-card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [PhoneCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  phones: Phone[] = [];
  isLoading = true;
  private phonesSubscription!: Subscription;



  constructor(
    private phoneService: PhoneService,
    private cdr: ChangeDetectorRef){}

    ngOnInit(){
      this.loadingPhones(3)
    }

    loadingPhones(limit:number){
        this.isLoading = true;
    this.phonesSubscription = this.phoneService.getPhones().subscribe({
      next: (phones) => {

        
        this.phones = phones;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Loading Error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
    }

  ngOnDestroy() {
    if (this.phonesSubscription) {
      this.phonesSubscription.unsubscribe();
    }
  }

}
