import { Component, inject,  } from '@angular/core';
import { ButtonDetails,NoPhoneMessage } from '../../../shared';
import { PhoneService } from '../../../core/services';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-phones',
  imports: [ButtonDetails, NoPhoneMessage],
  templateUrl: './phones.html',
  styleUrl: './phones.css',
})
export class Phones {
  private phoneService = inject(PhoneService);

  phones$ = toSignal(
    this.phoneService.getAllPhones()
  );
}
