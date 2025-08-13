import {
  Component,
  DestroyRef,
  Input,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  AuthService,
  CommentService,
  PhoneService,
} from '../../../core/services';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TextCommentFormService } from './commentFormService';
import { User } from '../../../models';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IsLikedPipe } from '../../../shared';

@Component({
  selector: 'app-details-comments-section',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, IsLikedPipe],
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

  form: FormGroup = this.textCommentFormService.createForm();
  phoneId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('id') || '')
  );
  isLoggedIn: Signal<boolean> = this.authService.isLoggedIn;
  currentUser: Signal<User | null> = this.authService.currentUser;
  userId: string | null = this.authService.getCurrentUserId();
  phoneId: string = this.phoneService.getPathPhoneId(this.route);
  comments = this.commentService.comments;

  ngOnInit() {
    this.commentService.loadComments(this.phoneId);
  }

  onLikeComment(commentId: string) {
    this.commentService
      .likeComment(commentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  onDeleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId, this.phoneId);
  }
  onCreateComment(): void {
    if (this.textCommentFormService.isFormValid(this.form)) {
      const commentText = this.form.get('text')?.value;
      this.commentService
        .createComment(this.phoneId, commentText)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.form.reset();
          },
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
