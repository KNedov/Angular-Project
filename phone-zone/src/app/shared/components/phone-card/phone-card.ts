import { Component, Input } from '@angular/core';
import { Phone } from '../../../models';
import { MatIconModule} from "@angular/material/icon";


@Component({
  selector: 'app-phone-card',
  imports: [MatIconModule],
  templateUrl: './phone-card.html',
  styleUrl: './phone-card.css'
})
export class PhoneCard {
@Input() phone!:Phone
}
