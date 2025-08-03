// details-comments-section.component.ts
import { Component, Input, inject } from '@angular/core';
import { Comment } from '../../../models';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  AuthService,
  CommentService,
  PhoneService,
} from '../../../core/services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-details-comments-section',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './details-comments-section.html',
  styleUrls: ['./details-comments-section.css'],
})
export class DetailsCommentsSection {
  private commentService = inject(CommentService);
  private authService = inject(AuthService);
  private phoneService = inject(PhoneService);
  private activatedRoute = inject(ActivatedRoute);

  isLoggedIn = this.authService.isLoggedIn;
  currentUser = this.authService.currentUser;
  phoneId: string = this.phoneService.getPathPhoneId(this.activatedRoute);

  @Input() isPhoneOwner: boolean = false;
  comments$: Observable<Comment[]> = this.commentService.loadComments(
    this.phoneId
  );

  onLikeComment(commentId: string) {
  
      this.commentService.likeComment(commentId).subscribe({
      next: () => {
        
        this.comments$ = this.commentService.loadComments(this.phoneId);
     
      },
      error: (err) => console.error('Error wit Like:', err)
    });
  }
}
