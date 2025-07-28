import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ActiveLink } from '../../../shared';

@Component({
  selector: 'app-products-board',
  imports: [RouterLink,ActiveLink,RouterOutlet],
  templateUrl: './products-board.html',
  styleUrl: './products-board.css'
})
export class ProductsBoard {

}
