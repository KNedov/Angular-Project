import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tablets',
  imports: [RouterLink,MatIconModule,MatCardModule],
  templateUrl: './tablets.html',
  styleUrl: './tablets.css'
})
export class Tablets {

}
