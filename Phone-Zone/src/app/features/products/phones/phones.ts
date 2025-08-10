import { Component, inject, signal, Signal,  } from '@angular/core';
import { ButtonDetails,NoPhoneMessage } from '../../../shared';
import { PhoneService } from '../../../core/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { Phone } from '../../../models';
@Component({
  selector: 'app-phones',
  imports: [ButtonDetails, NoPhoneMessage],
  templateUrl: './phones.html',
  styleUrl: './phones.css',
})
export class Phones {
  private phoneService = inject(PhoneService);

  phones$:Signal<Phone[]|null> = toSignal(this.phoneService.getAllPhones(), { initialValue: null });

}
