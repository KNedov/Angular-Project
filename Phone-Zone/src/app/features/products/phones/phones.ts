import { Component, inject, signal } from '@angular/core';
import { ButtonDetails, Loader, NoPhoneMessage } from '../../../shared';

import { PhoneService } from '../../../core/services';
import { Phone } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-phones',
  imports: [Loader, ButtonDetails, NoPhoneMessage],
  templateUrl: './phones.html',
  styleUrl: './phones.css',
})
export class Phones {
  isLoading = signal(true);
  error=signal<string|null>(null)
  private phoneService = inject(PhoneService);


  phones = toSignal(this.phoneService.getAllPhones().pipe(
    catchError((err)=>
   { this.error.set('Loading failed,Please try again later!');
    console.error(err);
     return of([] as Phone[]);
   }),
   finalize(()=>
    this.isLoading.set(false)
   )
    
    
  ), {
    initialValue: [] as Phone[],
  });
}
