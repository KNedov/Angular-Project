import { Component, Input } from '@angular/core';
import { Phone } from '../../../models';


@Component({
  selector: 'app-phone-card',
  imports: [],
  templateUrl: './phone-card.html',
  styleUrl: './phone-card.css'
})
export class PhoneCard {
 @Input() phone!: Phone;

}
