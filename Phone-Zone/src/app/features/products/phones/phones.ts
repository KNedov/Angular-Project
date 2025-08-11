import { Component, inject } from '@angular/core';
import { PhoneCard, NoPhoneMessage } from '../../../shared';
import { PhoneService } from '../../../core/services';
import { Phone } from '../../../models';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-phones',
  imports: [PhoneCard, AsyncPipe, NoPhoneMessage],
  templateUrl: './phones.html',
  styleUrl: './phones.css',
})
export class Phones {
  private phoneService = inject(PhoneService);

  phones$: Observable<Phone[]> = this.phoneService.getAllPhones();
}
