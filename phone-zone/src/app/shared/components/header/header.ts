import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { ActiveLinkDirective } from '../../directives/active-link/active-link';

@Component({
  selector: 'app-header',
  imports: [RouterLink,MatIconModule,ActiveLinkDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})


export class Header {


}
