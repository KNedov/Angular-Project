import { Component, Input } from '@angular/core';
import { Comment } from '../../../models';

@Component({
  selector: 'app-comment-card',
  imports: [],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css'
})
export class CommentCard {
@Input()comment!:Comment
@Input()isNotCommentOwner:Boolean=false
@Input()isNotPhoneOwner:Boolean=false
}
