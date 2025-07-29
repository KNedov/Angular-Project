import { ChangeDetectorRef, Component } from '@angular/core';
import { DetailsPhoneContent } from "../details-phone-content/details-phone-content";
import { DetailsCommentsSection } from "../details-comments-section/details-comments-section";
import { PhoneService } from '../../../core/services';
import { Phone } from '../../../models';
import { Observable, Subscription } from 'rxjs';
import { Loader } from "../../../shared";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-board',
  imports: [DetailsPhoneContent, DetailsCommentsSection, Loader],
  templateUrl: './details-board.html',
  styleUrl: './details-board.css'
})
export class DetailsBoard {
  phone!:Phone
  isCommentOwner: boolean=false
  isPhoneOwner:boolean=false
  loading:boolean=true
  private phoneSubscription!:Subscription

  constructor(
    private phoneService:PhoneService,
    private activatedRoute:ActivatedRoute
   
  ){}

  ngOnInit(){
    let id:string|null=this.activatedRoute.snapshot.paramMap.get('id')
    if(id===null){
      id=''
    }
    this.loadPhoneDetails(id)
  }



  loadPhoneDetails(id:string){
    this.loading = true;

    this.phoneSubscription = this.phoneService.getPhoneDetails(id).subscribe({
      next: (phone) => {
    
        
        this.phone = phone;
        this.loading = false;
      
      },
      error: (err) => {
        console.error('Loading Error:', err);
        this.loading = false;
       
      },
    });
  }
  ngOnDestroy(){
    if(this.phoneSubscription){
      this.phoneSubscription.unsubscribe()
    }
  }

}
