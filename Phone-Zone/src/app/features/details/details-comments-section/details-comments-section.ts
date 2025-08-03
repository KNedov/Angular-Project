import { Component,inject,Input, signal } from '@angular/core';
import { Comment } from '../../../models';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services';


@Component({
  selector: 'app-details-comments-section',
  imports: [DatePipe],
  templateUrl: './details-comments-section.html',
  styleUrl: './details-comments-section.css'
})


export class DetailsCommentsSection {
ngAfterInit(){
  console.log(this.isLoggedIn);
  
}


  authService = inject(AuthService)
  currentUserId:string | null = this.authService.getOwnerId();
  isLoggedIn:boolean = this.authService.isLoggedIn();
  
@Input()isPhoneOwner:boolean=true
@Input()comments!:Comment[]

onDeleteComment(){
  console.log('Delete Comment');
}

onLikeComment(){
  console.log('Like Comment');}

onDeletePhone(){
  console.log('Delete phone');  }
onEditPhone() {
  console.log('Edit phone details');
}

}
