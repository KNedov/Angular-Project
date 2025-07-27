import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Phone } from '../../../models';

@Component({
  selector: 'app-button-details',
  imports: [RouterLink,MatIconModule],
  templateUrl: './button-details.html',
  styleUrl: './button-details.css'
})
export class ButtonDetails {
  @Input()phoneId!:string

}
