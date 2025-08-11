import { Component, Input } from '@angular/core';
import { Phone } from '../../../models';
import { ButtonDetails } from '../button-details/button-details';

@Component({
  selector: 'app-phone-card',
  imports: [ButtonDetails],
  templateUrl: './phone-card.html',
  styleUrl: './phone-card.css',
})
export class PhoneCard {
  @Input() phone!: Phone;
}
