import { Component, DestroyRef, Input, OnInit, Signal, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  AuthService,
  CommentService,
  PhoneService,
} from '../../../core/services';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { TextCommentFormService } from './commentFormService';
import { Comment, User } from '../../../models';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IsLikedPipe } from '../../../shared';

@Component({
  selector: 'app-details-comments-section',
  standalone: true,
  imports: [DatePipe, AsyncPipe, ReactiveFormsModule,IsLikedPipe],
  templateUrl: './details-comments-section.html',
  styleUrls: ['./details-comments-section.css'],
})
export class DetailsCommentsSection implements OnInit {
  @Input() isPhoneOwner: boolean | null = false;

  private commentService = inject(CommentService);
  private authService = inject(AuthService);
  private phoneService = inject(PhoneService);
  private route = inject(ActivatedRoute);
  private textCommentFormService = inject(TextCommentFormService);
  private destroyRef = inject(DestroyRef);
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  form: FormGroup = this.textCommentFormService.createForm();
  phoneId$:Observable<string> = this.route.paramMap.pipe(map((params) => params.get('id') || ''));
  isLoggedIn:Signal<boolean> = this.authService.isLoggedIn;
  currentUser:Signal<User|null> = this.authService.currentUser;
  userId:string|null= this.authService.getCurrentUserId()
  phoneId: string = this.phoneService.getPathPhoneId(this.route);
 
  ngOnInit(){}

  comments$:Observable<Comment[]> = this.refreshTrigger$.pipe(
    switchMap(() => this.commentService.loadComments(this.phoneId))
  );


  onLikeComment(commentId: string) {
    this.commentService.likeComment(commentId).subscribe({
      next: () => {
        this.comments$ = this.commentService.loadComments(this.phoneId);
      },
      error: (err) => console.error('Error wit Like:', err),
    });
  }

  onDeleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId, this.phoneId).subscribe({
      next: () => {
        this.refreshTrigger$.next();
      },
      error: (err) => console.error('Error:', err),
    });
  }
  onCreateComment(): void {
    if (this.textCommentFormService.isFormValid(this.form)) {
      this.phoneId$
        .pipe(
          switchMap((phoneId) => {
            const commentText = this.form.get('text')?.value;
            return this.commentService.createComment(phoneId, commentText);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: () => {
            this.form.reset();
            this.refreshTrigger$.next();
          },
          error: (err) => console.error('Error creating comment:', err),
        });
    } else {
      this.textCommentFormService.markFormTouched(this.form);
    }
  }

   get textErrorMessage(): string {
    return this.textCommentFormService.getTextErrorMessage(this.form);
  }
  get textIsValid(): boolean {
    return this.textCommentFormService.isTextError(this.form);
  }
  get isFormValid(): boolean {
    return this.textCommentFormService.isFormValid(this.form);
  }



}
