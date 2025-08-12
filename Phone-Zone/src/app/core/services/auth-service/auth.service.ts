import { Injectable, signal } from '@angular/core';
import { User } from '../../../models';
import { HttpClient } from '@angular/common/http';
import { filter, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private _isLoggedIn = signal<boolean>(false);
  private _currentUser = signal<User | null>(null);
  private _isOwner= signal<boolean>(false)

  public isLoggedIn = this._isLoggedIn.asReadonly();
  public currentUser = this._currentUser.asReadonly();
  public isOwner = this._isOwner.asReadonly();

  constructor(private httpClient: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this._currentUser.set(user);
      this._isLoggedIn.set(true);
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<User>(
        `${this.apiUrl}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .pipe(
        filter((user): user is User => user !== null),
        tap((user: User) => {
          this._isLoggedIn.set(true);
          this._currentUser.set(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }
  register(
    username: string,
    email: string,
    tel: string,
    password: string,
    rePassword: string
  ): Observable<User> {
    return this.httpClient
      .post<User>(
        `${this.apiUrl}/register`,
        { username, email, tel, password },
        { withCredentials: true }
      )
      .pipe(
        filter((response) => response !== null),
        tap((user: User) => {
          this._isLoggedIn.set(true);
          this._currentUser.set(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }
checkAuth() {
  return this.httpClient
    .get<{ loggedIn: boolean; user?: User }>(`${this.apiUrl}/auth/check`, { withCredentials: true })
    .pipe(
      tap((res) => {
        console.log(res.loggedIn);
        
        this._isLoggedIn.set(res.loggedIn);

        if (res.loggedIn && res.user) {
          this._currentUser.set(res.user);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
        } else {
          this._currentUser.set(null);
          localStorage.removeItem('currentUser');
        }
      })
    );
}
  logout(): Observable<void> {
    return this.httpClient
      .post<void>(
        `${this.apiUrl}/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this._currentUser.set(null);
          this._isLoggedIn.set(false);
          localStorage.removeItem('currentUser');
        })
      );
  }

  getIsOwner(ownerId: any):void {
    const currentUser = this._currentUser();
    this._isOwner.set(currentUser?._id === ownerId) 
  }

  getCurrentUserId(): string | null {
    const currentUser = this._currentUser();
    return currentUser ? currentUser._id : null;
  }
}
