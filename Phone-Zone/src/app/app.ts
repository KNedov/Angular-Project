import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header, Loader } from './shared';
import { AuthService, LoadingService } from './core/services';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App  {
  protected title = 'Phone-Zone';
  constructor(public loadingService: LoadingService) {}
  authService = inject(AuthService);
  
}
