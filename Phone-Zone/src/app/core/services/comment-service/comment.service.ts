// comment.service.ts
import { inject, Injectable, Signal, signal } from '@angular/core';
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

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = 'http://localhost:3000/api';
  private phonesBehaviorSubject = new BehaviorSubject<Comment[]>([]);
  private _comments$ = signal<Comment[]>([]);
  public comments$ = this._comments$.asReadonly();
authService = inject(AuthService)
  isLoggedIn$ = this.authService.isLoggedIn
  currentUser$ =this.authService.currentUser

  constructor(private httpClient: HttpClient) {}

  loadComments(phoneId: string): Observable<Comment[]> {

    return this.httpClient
      .get<CommentsResponse>(`${this.apiUrl}/comments/${phoneId}`)
      .pipe(
        map((response: CommentsResponse) =>
          this.mapCommentsResponseToComments(response)
        ),
        tap((comments) => this.phonesBehaviorSubject.next(comments))
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
  mapCommentsResponseToComments(response: CommentsResponse): Comment[] {
    if (!response.success || !response.data) {
      return [];
    }

    return response.data.map((item) => ({
      likes: item.likes.map(
        (like) =>
          ({
            username: like.username,
          } as Likes)
      ),
      _id: item._id,
      text: item.text,
      userId: {
        _id: item.userId._id,
        username: item.userId.username,
      } as User,
      phoneId: item.phoneId,
      created_at: new Date(item.created_at),
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
    }));
  }
}
