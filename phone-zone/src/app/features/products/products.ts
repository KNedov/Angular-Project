import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { ActiveLinkDirective } from '../../shared/directives/active-link/active-link';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  imports: [RouterOutlet, ActiveLinkDirective, MatIconModule,RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {}
