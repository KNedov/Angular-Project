import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../../models'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsServices {
  private apiUrl= "http://localhost:3000/api/comments?limit={0}";

  constructor(private httpClient: HttpClient) {}

  getComments():Observable<Comment[]> {
     return this.httpClient.get<Comment[]>(this.apiUrl);
    }

  }


