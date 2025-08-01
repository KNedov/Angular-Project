import { Injectable, signal } from '@angular/core';
import { User } from '../../../models';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ApiUser } from '../../../models/ApiUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  private apiUrl = 'http://localhost:3000/api';
  private _isLoggedIn = signal<boolean>(false);
  private _currentUser = signal<User | null>(null);

  public isLoggedIn = this._isLoggedIn.asReadonly();
  public currentUser = this._currentUser.asReadonly();
  constructor(private httpClient: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this._currentUser.set(user);
      this._isLoggedIn.set(true);
    }
  }

   login(email: string, password: string): Observable<User> {
        return this.httpClient.post<ApiUser>(`${this.apiUrl}/login`, { email, password }, {
           
        }).pipe(
           
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
        );
    }
register(
  username:string,
  email:string,
  tel:string,
  password:string,
  rePassword:string
):Observable<User>{
  return this.httpClient.post<User>(`${this.apiUrl}/register`,{
    username,
    email,
    tel,
    password
  },{
    withCredentials:true
  }).pipe(
    tap(user=>{
this._currentUser.set(user)
this._isLoggedIn.set(true)
localStorage.setItem('currentUser',JSON.stringify(user))
    }
      
    )
  )
}


logout(): Observable<void> {
        return this.httpClient.post<void>(`${this.apiUrl}/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => {
                this._currentUser.set(null);
                this._isLoggedIn.set(false);
                localStorage.removeItem('currentUser');
            })
        );
    }


  

}
