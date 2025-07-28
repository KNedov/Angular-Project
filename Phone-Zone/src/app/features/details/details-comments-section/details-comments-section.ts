import { Component,Input } from '@angular/core';
import { Comment } from '../../../models';


@Component({
  selector: 'app-details-comments-section',
  imports: [],
  templateUrl: './details-comments-section.html',
  styleUrl: './details-comments-section.css'
})
export class DetailsCommentsSection {
@Input()isPhoneOwner:boolean=true
@Input()isCommentOwner:boolean=true
@Input()comments!:Comment[]

}
