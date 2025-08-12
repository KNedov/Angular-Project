import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { Phone } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private apiUrl = environment.apiUrl;

  private phonesBehaviorSubject = new BehaviorSubject<Phone[]>([]);
  private phoneBehaviorSubject = new BehaviorSubject<Phone | null>(null);
  public phones$ = this.phonesBehaviorSubject.asObservable();
  public phone$ = this.phoneBehaviorSubject.asObservable();
  isEditMode = signal(false);

  constructor(private httpClient: HttpClient) {}

  getPhones(limit: number = 3): void {
    this.httpClient
      .get<Phone[]>(`${this.apiUrl}/phones?limit=${limit.toString()}`)
      .subscribe((phones) => this.phonesBehaviorSubject.next(phones));
  }
  getMyPhones(userId: string | null): void {
    if (!userId) {
      this.phonesBehaviorSubject.next([]);
      return;
    }

    this.httpClient
      .get<Phone[]>(`${this.apiUrl}/phones/my-phones/${userId}`)
      .subscribe((myPhones) => this.phonesBehaviorSubject.next(myPhones));
  }
  getAllPhones(): void {
    this.httpClient
      .get<Phone[]>(`${this.apiUrl}/phones?limit=${0}`)
      .subscribe((phones) => this.phonesBehaviorSubject.next(phones));
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
