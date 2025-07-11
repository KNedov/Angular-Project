import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhonesServices {
  constructor(private httpClient: HttpClient) {}
  getPhones(limit: number = 0) {
    const apiUrl = `http://localhost:3000/api/phones?limit=${limit}`;
    return this.httpClient.get(apiUrl);
  }
}
