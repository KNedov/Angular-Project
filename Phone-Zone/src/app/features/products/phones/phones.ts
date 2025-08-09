import { Component, inject, signal } from '@angular/core';
import { ButtonDetails, Loader, NoPhoneMessage } from '../../../shared';

import { PhoneService } from '../../../core/services';
import { Phone } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-phones',
  imports: [ButtonDetails, NoPhoneMessage],
  templateUrl: './phones.html',
  styleUrl: './phones.css',
})
export class Phones {

  private phoneService = inject(PhoneService);

  phones = toSignal(
    this.phoneService.getAllPhones()
  );
}
