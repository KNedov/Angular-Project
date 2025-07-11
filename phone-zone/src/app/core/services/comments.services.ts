import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsServices {
  private apiUrl= "http://localhost:3000/api/comments?limit={0}";

  constructor(private httpClient: HttpClient) { }

  
}
