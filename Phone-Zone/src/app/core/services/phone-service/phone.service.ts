import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Phone } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private apiUrl="http://localhost:3000/api/phones?limit=${0}"
  private getById="http://localhost:3000/api/phones?${id}"

  constructor(private HttpClient:HttpClient){}

  getPhones(limit:number=3):Observable<Phone[]>{
    return this.HttpClient.get<Phone[]>(this.apiUrl.replace('${0}',limit.toString()))

  }
  getAllPhones():Observable<Phone[]>{
    return this.HttpClient.get<Phone[]>(this.apiUrl)

  }


  
}
