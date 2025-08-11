import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ActiveLink } from '../../../shared';

@Component({
  selector: 'app-product-navigation',
  imports: [RouterLink,ActiveLink,RouterOutlet],
  templateUrl: './product-navigation.html',
  styleUrl: './product-navigation.css'
})
export class ProductNavigation {

}
