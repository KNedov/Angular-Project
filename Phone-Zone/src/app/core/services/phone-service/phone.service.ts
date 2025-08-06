import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Phone } from '../../../models';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private apiUrl = 'http://localhost:3000/api';

  private phonesBehaviorSubject = new BehaviorSubject<Phone[]>([]);
  private phoneBehaviorSubject = new BehaviorSubject<Phone | null>(null);
  public phones$ = this.phonesBehaviorSubject.asObservable();
  public phone$ = this.phoneBehaviorSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getPhones(limit: number = 3): Observable<Phone[]> {
    return this.httpClient
      .get<Phone[]>(`${this.apiUrl}/phones?limit=${limit.toString()}`)
      .pipe(tap((phones) => this.phonesBehaviorSubject.next(phones)));
  }
  getAllPhones(): Observable<Phone[]> {
    return this.httpClient
      .get<Phone[]>(`${this.apiUrl}/phones?limit=${0}`)
      .pipe(tap((phones) => this.phonesBehaviorSubject.next(phones)));
  }
  get phoneValue(): Phone | null {
    return this.phoneBehaviorSubject.value;
  }
  getPhoneDetails(id: string): Observable<Phone> {
    return this.httpClient
      .get<Phone>(`${this.apiUrl}/phones/${id}`)
      .pipe(tap((phone) => this.phoneBehaviorSubject.next(phone)));
  }

  createPhone(phoneData: {
    phoneName: string;
    displaySize: string;
    color: string;
    price: number;
    image: string;
    cpu: string;
    ram: string;
    storage: string;
  }): Observable<Phone> {
    return this.httpClient.post<Phone>(
      `${this.apiUrl}/phones/create`,
      phoneData,
      {
        withCredentials: true,
      }
    );
  }
  updatePhoneState(updatedPhone: Phone): void {
    this.phoneBehaviorSubject.next(updatedPhone);
  }

  editPhone(
    phoneData: {
      phoneName: string;
      displaySize: string;
      color: string;
      price: number;
      image: string;
      cpu: string;
      ram: string;
      storage: string;
    },
    id: string
  ): Observable<Phone> {
    return this.httpClient
      .put<Phone>(`${this.apiUrl}/phones/${id.toString()}`, phoneData, {
        withCredentials: true,
      })
      .pipe(tap((editedPhone) => this.phoneBehaviorSubject.next(editedPhone)));
  }

  deletePhone(id: string | number): Observable<void> {
    if (!id) {
      return throwError(() => new Error('ID is required'));
    }

    return this.httpClient.delete<void>(
      `${this.apiUrl}/phones/${id.toString()}`,
      {
        withCredentials: true,
      }
    );
  }

  getPathPhoneId(route: ActivatedRoute): string {
    const id = route.snapshot.paramMap.get('id');
    return id ?? '';
  }
}
