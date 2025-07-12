import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Phone } from '../../models'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhonesServices {
private apiUrl = "http://localhost:3000/api/phones?limit=${0}";
  constructor(private httpClient: HttpClient) {}

  getLatestPhones(limit: number = 3): Observable<Phone[]> {
    return this.httpClient.get<Phone[]>(this.apiUrl.replace('${0}', limit.toString()));
  }

  getPhones(): Observable<Phone[]> {
    return this.httpClient.get<Phone[]>(this.apiUrl.replace('${0}', ''));
  }

}

  

