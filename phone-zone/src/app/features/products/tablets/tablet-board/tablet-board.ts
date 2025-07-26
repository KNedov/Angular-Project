import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-tablet-board',
  imports: [MatCardModule,MatIconModule,RouterLink],
  templateUrl: './tablet-board.html',
  styleUrl: './tablet-board.css'
})
export class TabletBoard {

}
