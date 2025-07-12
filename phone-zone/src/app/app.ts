import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Footer } from "./shared/components/footer/footer";
import { Main } from "./core/main/main";
import { latestPhones } from "./features/phones/latest-phones/latest-phones";


@Component({
  selector: 'app-root',
  imports: [Header, Footer, Main, latestPhones],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'phone-zone';
}
