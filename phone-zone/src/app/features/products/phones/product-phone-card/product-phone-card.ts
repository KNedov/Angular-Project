import { Component, Input } from '@angular/core';
import { ButtonDetails } from "../../../../shared/components/button-details/button-details";
import { Phone } from '../../../../models';


@Component({
  selector: 'app-product-phone-card',
  imports: [ ButtonDetails],
  templateUrl: './product-phone-card.html',
  styleUrl: './product-phone-card.css'
})
export class ProductPhoneCard {
  @Input()phone!:Phone

}
