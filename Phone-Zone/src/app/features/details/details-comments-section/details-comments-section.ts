import { Component,Input } from '@angular/core';
import { Comment } from '../../../models';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-details-comments-section',
  imports: [DatePipe],
  templateUrl: './details-comments-section.html',
  styleUrl: './details-comments-section.css'
})
export class DetailsCommentsSection {
@Input()isPhoneOwner:boolean=true
@Input()isCommentOwner:boolean=true
@Input()comments!:Comment[]

}
