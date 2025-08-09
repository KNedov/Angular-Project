// comment.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { Comment, User } from '../../../models';
import { CommentsResponse } from '../../../models/commentResponse.model';
import { Likes } from '../../../models/likes.model';
import { AuthService } from '../auth-service/auth.service';
import { PhoneService } from '../phone-service/phone.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = environment.apiUrl;
  private commentsBehaviorSubject = new BehaviorSubject<Comment[]>([]);
  private commentBehaviorSubject = new BehaviorSubject<Comment | null>(null);
  private _comments$ = signal<Comment[]>([]);
  private _comment$ = signal<Comment | null>(null);
  public comments$ = this._comments$.asReadonly();
  public comment$ = this._comment$.asReadonly();

  authService = inject(AuthService);
  phoneService = inject(PhoneService);
  isLoggedIn$ = this.authService.isLoggedIn$;
  currentUser$ = this.authService.currentUser$;

  constructor(private httpClient: HttpClient) {}

  loadComments(phoneId: string): Observable<Comment[]> {
    return this.httpClient
      .get<Comment[]>(`${this.apiUrl}/comments/${phoneId}`)
      .pipe(
        tap((comments) => {
          this.commentsBehaviorSubject.next(comments);
        })
      );
  }
  likeComment(commentId: string): Observable<Comment> {
    return this.httpClient
      .put<Comment>(
        `${this.apiUrl}/likes/${commentId}`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap((updatedComment) => {
          this._comments$.update((comments) => {
            return comments.map((comment) => {
              if (comment._id === updatedComment._id) {
                return {
                  ...comment,
                  likes: updatedComment.likes,
                  updatedAt: updatedComment.updatedAt,
                };
              }
              return comment;
            });
          });
        }),
        catchError((error) => {
          console.error('Error liking comment:', error);
          return throwError(() => error);
        })
      );
  }
  deleteComment(commentId: string, phoneId: string): Observable<Comment[]> {
    return this.httpClient
      .delete<Comment[]>(
        `${this.apiUrl}/phones/${phoneId}/comments/${commentId}`,
        { withCredentials: true }
      )
      .pipe(
        tap((updatedComments) => {
          this.commentsBehaviorSubject.next(updatedComments);
          console.log('Deleted successfully. Updated comments:');
        }),
        catchError((error) => {
          console.error('Error deleting comment:', error);
          return throwError(() => error);
        })
      );
  }
  createComment(phoneId: string, commentText: string): Observable<Comment[]> {
    return this.httpClient
      .post<Comment[]>(
        `${this.apiUrl}/phones/${phoneId}/comments`,
        { commentText },
        { withCredentials: true }
      )
      .pipe(
        tap((newComments) => {
          this.commentsBehaviorSubject.next(newComments);
        })
      );
  }
}
