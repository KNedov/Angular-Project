import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule } from '@angular/material/icon';
import { ActiveLink } from '../../directives/active-link/active-link';

@Component({
  selector: 'app-header',
  imports: [RouterLink,MatIconModule,ActiveLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {


}
