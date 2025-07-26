import { ChangeDetectorRef, Component } from '@angular/core';
import { ButtonDetails } from "../../../../shared/components/button-details/button-details";
import { Phone } from '../../../../models';
import {  Subscription } from 'rxjs';
import { PhoneService } from '../../../../core/services';
import { ProductPhoneCard } from '../product-phone-card/product-phone-card';
import { NoPhoneMessage } from '../../../../shared/components/no-phone-message/no-phone-message';
import { Loader } from '../../../../shared/components/loader/loader';

@Component({
  selector: 'app-phone-board',
  imports: [Loader, NoPhoneMessage, ProductPhoneCard],
  templateUrl: './phone-board.html',
  styleUrl: './phone-board.css'
})
export class PhoneBoard {
  phones:Phone[]=[]
  isLoading=true
  private phonesSubscription!:Subscription

  constructor(
    private phoneService:PhoneService,
    private changeDetectorRef:ChangeDetectorRef
  ){}
  

ngOnInit(){
  const loading:boolean=this.isLoading
    const NoPhone:[]=[]
    const products=this.loadingAllPhones()
    }

    loadingAllPhones(){
        this.isLoading = true;
    this.phonesSubscription = this.phoneService.getAllPhones().subscribe({
      next: (phones) => {

        
        this.phones = phones;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Loading Error:', err);
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
    }

  ngOnDestroy() {
    if (this.phonesSubscription) {
      this.phonesSubscription.unsubscribe();
    }
  }


}
