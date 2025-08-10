import { Component } from '@angular/core';
import { MyPhonesCard } from '../my-phones-card/my-phones-card';

@Component({
  selector: 'app-my-phones-board',
  imports: [MyPhonesCard],
  templateUrl: './my-phones-board.html',
  styleUrl: './my-phones-board.css',
})
export class MyPhonesBoard {}
