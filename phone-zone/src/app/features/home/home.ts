import { ChangeDetectorRef, Component } from '@angular/core';
import { PhoneService } from '../../core/services';
import { Phone } from '../../models';

import { PhoneCard } from '../../shared/components/phone-card/phone-card';
import { Subscription } from 'rxjs';
import { NoPhoneMessage } from '../../shared/components/no-phone-message/no-phone-message';
import { Loader } from '../../shared/components/loader/loader';

@Component({
  selector: 'app-home',
  imports: [PhoneCard,NoPhoneMessage,Loader],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  phones: Phone[] = [];
  test:Phone[]=[]
  isLoading = true;
  private phonesSubscription!: Subscription;



  constructor(
    private phoneService: PhoneService,
    private cdr: ChangeDetectorRef){}

    ngOnInit(){
      this.isLoading
      this.test
      this.loadingPhones(3)
    }

    loadingPhones(limit:number){
        this.isLoading = true;
    this.phonesSubscription = this.phoneService.getPhones(limit).subscribe({
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
