import { Component, Input } from '@angular/core';

import { CommentCard } from "../comment-card/comment-card";
import { Comment } from '../../../models';

@Component({
  selector: 'app-comment-section',
  imports: [ CommentCard],
  templateUrl: './comment-section.html',
  styleUrl: './comment-section.css'
})
export class CommentSection {
@Input() comments!: Comment[]
@Input() isNotPhoneOwner: boolean = false;
@Input() isNotCommentOwner: boolean = false;

}
