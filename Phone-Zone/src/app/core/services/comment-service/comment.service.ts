// comment.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Comment } from '../../../models';
import { AuthService } from '../auth-service/auth.service';
import { PhoneService } from '../phone-service/phone.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = environment.apiUrl;
  private _comments = signal<Comment[]>([]);
  public comments = this._comments.asReadonly();

  authService = inject(AuthService);
  phoneService = inject(PhoneService);
  isLoggedIn = this.authService.isLoggedIn;
  currentUser = this.authService.currentUser;

  constructor(private httpClient: HttpClient) {}

  loadComments(phoneId: string): void {
     this.httpClient
      .get<Comment[]>(`${this.apiUrl}/comments/${phoneId}`)
     .subscribe((comments)=>this._comments.set(comments))
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
          this._comments.update((comments) => {
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
    
      );
  }
  deleteComment(commentId: string, phoneId: string): void {
     this.httpClient
      .delete<Comment[]>(
        `${this.apiUrl}/phones/${phoneId}/comments/${commentId}`,
        { withCredentials: true }
      )
   .subscribe((updatedComment)=>{
    
    this._comments.set(updatedComment)})
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
          this._comments.set(newComments);
        })
      );
  }
}
