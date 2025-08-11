import { Component, Input } from '@angular/core';
import { Phone } from '../../../models';

@Component({
  selector: 'app-details-phone-content',
  imports: [],
  templateUrl: './details-phone-content.html',
  styleUrl: './details-phone-content.css',
})
export class DetailsPhoneContent {
  @Input() phone!: Phone;
}
