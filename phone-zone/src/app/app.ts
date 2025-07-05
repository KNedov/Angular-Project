import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./core/header/header";
import { Footer } from "./core/footer/footer";
import { Main } from "./core/main/main";
import { PhonesList } from "./phones-list/phones-list";


@Component({
  selector: 'app-root',
  imports: [Header, Footer, Main, PhonesList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'phone-zone';
}
