import { Component, inject, Signal, signal } from '@angular/core';
import { Phone } from '../../../models';
import { Observable, Subscription } from 'rxjs';
import { AuthService, PhoneService } from '../../../core/services';
import { Loader, NoPhoneMessage } from '../../../shared';
import { PhoneCard } from '../phone-card/phone-card';
import { CommonModule,  } from '@angular/common';

@Component({
  selector: 'app-home-board',
  imports: [NoPhoneMessage, Loader, PhoneCard,CommonModule,],
  templateUrl: './home-board.html',
  styleUrl: './home-board.css',
})
export class HomeBoard {
  phones$: Observable<Phone[]>
  test: Phone[] = [];
  isLoading=signal<boolean>(true)
  private authService=inject(AuthService)
  private phoneService= inject(PhoneService)
  readonly isLoggedIn:Signal<boolean>=this.authService.isLoggedIn
 
  constructor(){
    this.isLoading.set(true)
    this.phones$= this.phoneService.phones$
    this.phoneService.getPhones(3).subscribe(
      ()=>{
        this.isLoading.set(false)
      }
    )
  }
 




  
}
