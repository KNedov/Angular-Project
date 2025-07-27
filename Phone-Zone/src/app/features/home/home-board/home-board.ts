import { ChangeDetectorRef, Component } from '@angular/core';
import { Phone } from '../../../models';
import { Subscription } from 'rxjs';
import { PhoneService } from '../../../core/services';
import { Loader, NoPhoneMessage } from '../../../shared';
import { PhoneCard } from '../phone-card/phone-card';


@Component({
  selector: 'app-home-board',
  imports: [NoPhoneMessage,Loader,PhoneCard],
  templateUrl: './home-board.html',
  styleUrl: './home-board.css'
})
export class HomeBoard {
phones: Phone[] = [];
  test:Phone[]=[]
  isLoading = true;
  private phonesSubscription!: Subscription;



  constructor(
    private phoneService: PhoneService,
    private cdr: ChangeDetectorRef){}

    ngOnInit(){
      this.isLoading
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
