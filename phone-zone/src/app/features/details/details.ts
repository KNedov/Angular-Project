import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PhoneContent } from './phone-content/phone-content';
import { CommentSection } from './comment-section/comment-section';
import { PhoneService } from '../../core/services';
import {  Subscription } from 'rxjs';
import { Phone } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { Loader } from "../../shared/components/loader/loader";

@Component({
  selector: 'app-details',
  imports: [PhoneContent, CommentSection, Loader],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  phone!:Phone
  isNotCommentOwner: boolean = false;
  isNotPhoneOwner: boolean = false;
  loading: boolean = true;
  private phoneSubscription!: Subscription;

  constructor(
    private phoneService: PhoneService,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    let id:string|null= this.activatedRoute.snapshot.paramMap.get('id')
    if (id===null) {
      id=''
    }
    this.loading
    this.loadingPhone(id);
  }

  loadingPhone( id:string) {
   

    this.loading = true;
    
    this.phoneSubscription = this.phoneService
    

      .getPhone (id)
      .subscribe({
        next: (phone) => {
          this.phone = phone
          this.loading = false;
          this.changeDetectorRef.detectChanges();
        },
        error: (err) => {
          console.error('Loading Error:', err);
          this.loading = false;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  ngOnDestroy(){
    if(this.phoneSubscription){
      this.phoneSubscription.unsubscribe()
    }
  }
}
