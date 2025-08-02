import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Phone } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private apiUrl = 'http://localhost:3000/api';
  private getById = 'http://localhost:3000/api/phones/${id}';
  private createPhoneUrl = 'http://localhost:3000/api/phones/create';
  private phonesBehaviorSubject = new BehaviorSubject<Phone[]>([]);
  public phones$ = this.phonesBehaviorSubject.asObservable()

  constructor(private HttpClient: HttpClient) {}

  getPhones(limit: number = 3): Observable<Phone[]> {
    return this.HttpClient.get<Phone[]>(`${this.apiUrl}/phones?limit=${limit.toString()}`)
    .pipe(
      tap(phones=> this.phonesBehaviorSubject.next(phones))
    )
    
  }
  getAllPhones(): Observable<Phone[]> {
    return this.HttpClient.get<Phone[]>(`${this.apiUrl}/phones?limit=${0}`)
    .pipe(
      tap(phones=> this.phonesBehaviorSubject.next(phones))
    )
  }

  getPhoneDetails(id: string) {
    return this.HttpClient.get<Phone>(`${this.apiUrl}/phones/${id.toString()}`);
  }
  createPhone(phoneData: {
  phoneName: string,
  displaySize: string,
  color: string,
  price: number,
  image: string,
  cpu: string,
  ram: string,
  storage: string
}): Observable<Phone> {
;
    
    return this.HttpClient.post<Phone>(this.createPhoneUrl,phoneData, {
      withCredentials: true,
    })
  }
}
