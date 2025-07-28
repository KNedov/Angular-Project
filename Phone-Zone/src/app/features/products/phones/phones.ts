import { ChangeDetectorRef, Component } from '@angular/core';
import { ButtonDetails, Loader, NoPhoneMessage } from "../../../shared";
import { Subscription } from 'rxjs';
import { PhoneService } from '../../../core/services';
import { Phone } from '../../../models';

@Component({
  selector: 'app-phones',
  imports: [Loader,ButtonDetails,NoPhoneMessage],
  templateUrl: './phones.html',
  styleUrl: './phones.css'
})
export class Phones {
phones:Phone[]=[]
isLoading=true
private phoneSubscription!:Subscription

constructor(
  private phoneService:PhoneService,
  private changeDetectorRef:ChangeDetectorRef
){}

ngOnInit(){
  this.isLoading
  this.loadingAllPhones()
}

loadingAllPhones(){
  this.isLoading=true
  this.phoneSubscription=this.phoneService.getAllPhones().subscribe({
    next:(phones) =>{
      this.phones=phones
      console.log(phones);
      
      this.isLoading=false
      this.changeDetectorRef.detectChanges()
    },
    error:(err)=>{
      console.error('Loading Error:',err);
      this.isLoading=false
      this.changeDetectorRef.detectChanges()
      
    }
  })
}

ngOnDestroy(){
  if(this.phoneSubscription){
    this.phoneSubscription.unsubscribe()
  }
}
}
