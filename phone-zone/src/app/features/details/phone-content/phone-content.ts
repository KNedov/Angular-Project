import { Component, Input } from '@angular/core';
import { Phone } from '../../../models';

@Component({
  selector: 'app-phone-content',
  imports: [],
  templateUrl: './phone-content.html',
  styleUrl: './phone-content.css'
})
export class PhoneContent {
@Input() phone!: Phone
}
