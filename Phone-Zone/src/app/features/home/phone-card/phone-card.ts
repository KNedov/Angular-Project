import { Component, Input } from '@angular/core';
import { Phone } from '../../../models';
import { MatIconModule } from '@angular/material/icon';
import { ButtonDetails } from "../../../shared/components/button-details/button-details";


@Component({
  selector: 'app-phone-card',
  imports: [MatIconModule, ButtonDetails],
  templateUrl: './phone-card.html',
  styleUrl: './phone-card.css'
})
export class PhoneCard {
@Input()phone!:Phone
}
